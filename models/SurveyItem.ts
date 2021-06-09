import { Question } from './Question'

export interface SurveyItem {
  id: string
  title: string
  content: string
  questions: Question[]
}

export const getDefaultSurveyItem = (): SurveyItem => {
  return {
    id: '',
    title: '',
    content: '',
    questions: []
  }
}

export interface SurveyItemTemplate {
  id: string
  title: string
  content: string
}
