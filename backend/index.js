import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import axios from 'axios'
import { ObjectId } from 'mongodb'

dotenv.config()


const app = express()

app.use(cors())






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


app.listen(process.env.PORT, () => {
    console.log(`Running the server on port ${process.env.PORT}`)
})