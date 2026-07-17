import mongoose from 'mongoose'



let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String
})


export const User = mongoose.model('user', userSchema)