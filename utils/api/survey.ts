import { Survey, SurveyPayload } from 'models/Survey'
import { SurveyItemTemplate } from 'models/SurveyItem'
import { User } from 'models/User'
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
    backUrl: '/v2/surveys',
    options: {
      data: surveyPayload
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

export const requestSurveyByCode = async(code: string, token?: string | object): Promise<Survey | undefined> => {
  const response = await requestApi({
    method: 'get',
    backUrl: `/guest/surveys/${code}`,
    options: {
      accessTokenOrCtx: token
    }
  })
  return response?.data || undefined
}

export const requestSurveyOwnerByCode = async(code: string, token?: string | object): Promise<User | undefined> => {
  const response = await requestApi({
    method: 'get',
    backUrl: `/guest/surveys/${code}/publicOwnerData`,
    options: {
      accessTokenOrCtx: token
    }
  })
  return response?.data || undefined
}
