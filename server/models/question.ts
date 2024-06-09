import { model, Schema } from 'mongoose'

const QuestionSchema = new Schema({
    statement: {
        type: String,
        trim: true,
    },
})

export default model('Question', QuestionSchema)
