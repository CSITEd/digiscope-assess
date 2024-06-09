import Question from '../models/question'

export default defineEventHandler(async (event) => {
    return {
        hello: 'World',
        questions: await Question.find()
    }
})
