import { model, Schema } from 'mongoose'

export type IChoice = {
    image: URL
    type: 'image'
} | {
    text: string
    type: 'text'
}

export type IQuestion = {
    answer: number
    choices: IChoice[]
    context?: string
    statement: string
    type: 'behaviour' | 'theory'
}

const ChoiceSchema = new Schema<IChoice>({
    image: {
        type: String,
    },
    text: {
        type: String
    },
}, {
    id: false,
    _id: false,
})

const QuestionSchema = new Schema<IQuestion>({
    answer: {
        type: Number,
        required: true,
    },
    choices: {
        type: [ChoiceSchema],
        required: true,
    },
    context: {
        type: String,
        trim: true,
    },
    statement: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['behaviour', 'theory'],
        required: true,
    },
})

export default model<IQuestion>('Question', QuestionSchema)
