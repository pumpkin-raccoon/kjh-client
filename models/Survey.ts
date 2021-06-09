import { SurveyItem } from './SurveyItem'

export interface Survey {
  id: string
  userId: string
  title: string
  content: string
  items: SurveyItem[]
  code: string
  createdAt: string
  updatedAt: string
}

export const getDefaultSurvey = (): Survey => {
  return {
    id: '',
    userId: '',
    title: '',
    content: '',
    items: [],
    code: '',
    createdAt: '',
    updatedAt: ''
  }
}

export interface SurveyPayload {
  title: string
  content: string
  surveyItemTemplateIds: string[]
  validFrom?: string
  validUntil?: string
}
