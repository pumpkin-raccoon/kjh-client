export interface Question {
  id: string
  type: QuestionType
  content: string
}

export const getDefaultQuestion = (): Question => {
  return {
    id: '',
    type: QuestionType.CUSTOM,
    content: ''
  }
}

export enum QuestionType {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED',
  CUSTOM = 'CUSTOM'
}
