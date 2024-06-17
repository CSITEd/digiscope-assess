import Quiz from '../models/quiz';

export default defineEventHandler(async (event) => {
  const { req } = event.node
  const data = await $fetch<{
    success: boolean
    score: number
  }>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    params: {
      secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: req.headers['google-recaptcha-token'],
    },
  });

  if (data.success && data.score > 0.5) {
    const body = await readBody(event)

    const quiz = await Quiz.findOne({ key: body.key })
    if (quiz) {
      quiz.answers = body.answers
      quiz.ended = new Date()
      
      await quiz.save()

      return true
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Quiz not allowed for non human visitors!',
  })
})
