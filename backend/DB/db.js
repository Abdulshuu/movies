import mongoose from 'mongoose'



async function DB() {
    await mongoose.connect(process.env.MONGOOSE_DB_URI)
    console.log("connected DB !!")
}

export { DB }