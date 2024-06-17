import { model, Schema } from 'mongoose'
import { IQuestion } from '@/server/models/question'

export type IQuiz = {
  email?: string
  key: string
  questions: IQuestion[]
  started: Date
}

const QuizSchema = new Schema<IQuiz>({
  email: {
    type: String,
    trim: true,
  },
  key: {
    type: String,
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
