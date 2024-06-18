import crypto from 'crypto'

import Question, { IQuestion } from '@/server/models/question'
import Quiz from '@/server/models/quiz';

export default defineEventHandler(async () => {
  const questions = await Question.aggregate([
    { $sample: { size: 5 } },
    { $project: { choices: 1, context: 1, image: 1, statement: 1} },
  ])
    
  const quiz = new Quiz({
    key: null,
    questions: questions.map((doc) => doc._id)
  })
  while (quiz.key === null) {
    const key = crypto.randomUUID()
    if (!(await Quiz.exists({ key }))) {
      quiz.key = key
    }
  }
  await quiz.save()

  return {
    key: quiz.key,
    questions: questions.map((doc) => Question.hydrate(doc)) as IQuestion[]
  }
})
