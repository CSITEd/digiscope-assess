import { model, Schema } from 'mongoose'

export type IQuestion = {
    answer: number
    choices: string[]
    statement: string
}

const QuestionSchema = new Schema<IQuestion>({
    answer: {
        type: Number,
        required: true,
    },
    choices: {
        type: [String],
        required: true,
    },
    statement: {
        type: String,
        required: true,
        trim: true,
    },
})

export default model<IQuestion>('Question', QuestionSchema)
