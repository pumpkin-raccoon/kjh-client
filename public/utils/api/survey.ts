import { Survey, SurveyPayload } from 'models/Survey'
import { SurveyItemTemplate } from 'models/SurveyItem'
import { requestApi } from '.'

export const requestSurveyTemplates = async(): Promise<SurveyItemTemplate[] | undefined> => {
  const response = await requestApi({
    method: 'get',
    backUrl: '/surveys/templates'
  })
  return response?.data || undefined
}

export const requestCreateSurvey = async(surveyPayload: SurveyPayload): Promise<Survey | undefined> => {
  const response = await requestApi({
    method: 'post',
    backUrl: '/surveys',
    options: {
      data: JSON.stringify(surveyPayload)
    }
  })
  return response?.data || undefined
}

export const requestUserSurveys = async(userId: string): Promise<Survey[] | undefined> => {
  const response = await requestApi({
    method: 'get',
    backUrl: `/users/${userId}/surveys`
  })
  return response?.data || undefined
}
