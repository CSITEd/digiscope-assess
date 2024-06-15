import { model, Schema } from 'mongoose'

type IChoice = {
    image: URL
    text: string
}

export type IQuestion = {
    answer: number
    choices: IChoice[]
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
