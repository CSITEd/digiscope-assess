import Quiz from '../models/quiz';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const quiz = await Quiz.findOne({ key: body.key })
  if (quiz) {
    quiz.answers = body.answers
    quiz.ended = new Date()
      
    await quiz.save()

    return true
  }
})
