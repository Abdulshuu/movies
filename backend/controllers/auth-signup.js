import jwt from 'jsonwebtoken'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import { OAuth2Client } from 'google-auth-library'
import { User } from '../DB/schemas/userSchema/User.js'
import { DB } from '../DB/db.js'

async function signup(req, res) {


    let { token } = req.body
    // console.log("reached : ", token)

    try {
        DB()

        let ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })


        let payload = ticket.getPayload()
        let { sub: googleId, name, email, picture } = payload
        console.log(payload)

        let response = await User.find({ email: email })
        // console.log(response)
        if (response.length == 0) {
            console.log("reached! and not found duplicate ")
            let user = await new User({
                name: name,
                email: email,
                avatarUrl: picture
            })
            console.log(user)
            await user.save()


            let token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET, //get the jwt token 1
                {
                    expiresIn: '7d'
                }
            )

            res.cookie(
                "token",
                token,
                {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    path: '/',
                    sameSite: 'lax',      // works for localhost-to-localhost in most browsers
                    secure: false,
                }
            )
            return res.json({
                msg: "user authenticate ",
                data: { name, picture, email }
            })

        } else {

            //"reached when email like the one you entered already exists"
            console.log("reachyyy")

            // console.log(response[0]._id.toString())
            let userId = response[0]._id.toString()
            let token = jwt.sign({ userId, name, email }, process.env.JWT_SECRET)

            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7 })

            return res.status(200).json({
                token,
                msg: "already user exists"
            })
        }




    } catch (err) {
        console.log(`error occured during getting the users detail `, err)
    }








}

export { signup }