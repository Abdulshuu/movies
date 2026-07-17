import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import axios from 'axios'
import { ObjectId } from 'mongodb'
import { signup } from './controllers/auth-signup.js'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // exact frontend origin, not '*'
    credentials: true,
    sameSite: 'lax',      // works for localhost-to-localhost in most browsers
    secure: false,
}))

app.use(express.json())
app.use(cookieParser())




async function getDb() {
    try {

        const client = new MongoClient(process.env.DB_URI)
        let dbName = 'sample_mflix'

        await client.connect()
        console.log("connected succesfully ")


        let db = await client.db(dbName)
        return db


    } catch (err) {

    }
}
async function getMovies(pageNumber) {
    try {
        let db = await getDb()

        let skipNum = (pageNumber - 1) * 20



        let movies = await db.collection('movies').aggregate([
            {
                $skip: skipNum
            },
            {
                $match: { 'imdb.rating': { $type: "number" } }
            },
            {
                $project: { _id: 1, poster: 1, plot: 1, title: 1, genres: 1, type: 1, 'imdb.rating': 1 }
            },
            {
                $limit: 20
            },
            {
                $sort: { 'imdb.rating': -1 }
            },

        ]).toArray()

        return movies
    } catch (error) {
        console.log(error)
    } finally {
        // await client.close()
    }



}



app.get('/', async (req, res) => {


    let movies = await getMovies(1)

    // console.log(movies)


    res.json({
        movies
    })
})


app.get('/get-page', async (req, res) => {

    let pgNum = req.query.num

    let movies = await getMovies(pgNum)
    res.json({
        movies
    })

})

app.get('/get-movie', async (req, res) => {

    try {
        let id = new ObjectId(req.query.id)
        let db = await getDb()
        let movie = await db.collection('movies').aggregate([
            {
                $match: {
                    _id: id
                }
            },
        ]).toArray()


        res.json({
            movie
        })


    } catch (err) {
        console.log(err)
    }
    `   `




})

app.get('/auth-status', (req, res) => {
    let userToken = req.cookies.token

    if (!userToken) {
        return res.status(404).json({
            msg: "token not found in the cookeis"
        })
    }
    res.status(200).json({
        msg: 'user found',
        userToken
    })
})

app.get('/api/remove-auth', (req, res) => {
    let token = req.cookies.token
    if (token) {
        res.clearCookie('token')
        console.log('done')
        return res.status(200).json({
            msg: 'user no longer exists'
        })
    }
})


app.post('/api/auth/login',
    signup
)


app.listen(process.env.PORT, () => {
    console.log(`Running the server on port ${process.env.PORT}`)
})