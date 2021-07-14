import { SurveyItem, SurveyItemPayload } from './SurveyItem'

export interface Survey {
  id: string
  userId: string
  title: string
  content: string
  items: SurveyItem[]
  code: string
  createdAt?: string
  updatedAt?: string
  validFrom?: string
  validUntil?: string
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
    updatedAt: '',
    validFrom: '',
    validUntil: ''
  }
}

export interface SurveyPayload {
  title: string
  content: string
  surveyItems: SurveyItemPayload[]
  validFrom?: string
  validUntil?: string
}
