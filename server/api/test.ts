import Question, { IQuestion } from '../models/question'

export default defineEventHandler(async (event) => {
    return {
        questions: await Question.find() as IQuestion[]
    }
})
