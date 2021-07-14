import { QuestionType } from 'models/Question'

export const getLabelTextByQuestionType = (questionType: QuestionType): string => {
  switch(questionType) {
    case QuestionType.GREEN:
      return 'continue'
    case QuestionType.YELLOW:
      return 'new'
    case QuestionType.RED:
      return 'stop'
    default:
      return questionType
  }
}
