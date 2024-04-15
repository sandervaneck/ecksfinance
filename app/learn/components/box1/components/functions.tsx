import { QuestionForm } from './Questions';

export const calculateScore = (questions: QuestionForm) =>
  (questions.questions.filter(
    (q) =>
      q.answer === q.correctAnswer.substring(0, q.correctAnswer.indexOf('.'))
  ).length /
    6) *
  100;
