import Question, { IQuestion } from '@/server/models/question'

export default defineEventHandler(async () => {
  return {
    questions: await Question.find() as IQuestion[]
  }
})
