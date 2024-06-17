import { model, Schema } from 'mongoose'
import { IQuestion } from '@/server/models/question'

export type IQuiz = {
  answers?: number[]
  email?: string
  ended?: Date
  key: string
  questions: IQuestion[]
  started: Date
}

const QuizSchema = new Schema<IQuiz>({
  answers: {
    type: [Number],
    default: undefined,
  },
  email: {
    type: String,
    trim: true,
  },
  ended: {
    type: Date,
  },
  key: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  questions: {
    type: [{
        type: Schema.ObjectId,
        ref: 'Question',
    }],
    required: true,
  },
  started: {
    type: Date,
    default: Date.now,
  }
})

export default model<IQuiz>('Quiz', QuizSchema)
