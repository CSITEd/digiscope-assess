import { model, Schema } from 'mongoose'

type IImageChoice = {
  image: string
  type: 'image'
}
type ITextChoice = {
  text: string
  type: 'text'
}

export type IChoice = IImageChoice | ITextChoice

export type IQuestion = {
  answer: number
  choices: IChoice[]
  context?: string
  image?: string
  statement: string
  type: 'behaviour' | 'theory'
}

const ChoiceSchema = new Schema<IChoice>({
  image: {
    type: String,
    trim: true,
  },
  text: {
    type: String,
    trim: true,
  },
}, {
  id: false,
  _id: false,
  toJSON: { virtuals: true }
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
  image: {
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

ChoiceSchema.virtual('type').get((_value, _virtual, doc) => {
  if (doc.text) {
    return 'text'
  } else if (doc.image) {
    return 'image'
  }
  return undefined
});

export default model<IQuestion>('Question', QuestionSchema)
