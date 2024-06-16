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
    const questions = await Question.aggregate([
      { $sample: { size: 2 } },
      { $project: { choices: 1, statement: 1} },
    ])

    return {
      questions: questions.map((doc) => Question.hydrate(doc)) as IQuestion[]
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Quiz not allowed for non human visitors!',
  })
})
