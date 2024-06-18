export default defineEventHandler(async (event) => {
  // const url = getRequestURL(event)

  // if (url.pathname.startsWith('/api/')) {
  //   const data = await $fetch<{
  //     success: boolean
  //     score: number
  //   }>('https://www.google.com/recaptcha/api/siteverify', {
  //     method: 'POST',
  //     params: {
  //       secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  //       response: event.node.req.headers['google-recaptcha-token'],
  //     },
  //   });
    
  //   if (!data.success || data.score <= 0.5) {
  //     throw createError({
  //       statusCode: 500,
  //       statusMessage: 'Not allowed for non humans!',
  //     })
  //   }
  // }
})
