import Question, { IQuestion } from '@/server/models/question'

export default defineEventHandler(async (event) => {
  const data = await $fetch<{
    success: boolean
    score: number
  }>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    params: {
      secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: event.node.req.headers['google-recaptcha-token'],
    },
  });

  if (data.success && data.score > 0.5) {
    return {
      questions: await Question.find() as IQuestion[]
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Quiz not allowed for non human visitors!',
  })
})
