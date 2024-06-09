import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
    console.log('Loading mongodb plugin...')

    try {
        await mongoose.connect('mongodb://localhost:27017/digiscope-dev')
        console.log('Connected to database')
    } catch (e) {
        console.error(e)
    }
})
