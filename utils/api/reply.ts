import { ItemReply } from 'models/Reply'
import { requestApi } from '.'

export const requestCreateReply = async(surveyId: string) => {
  const response = await requestApi({
    method: 'post',
    backUrl: `/guest/replies?surveyId=${surveyId}`,
  })
  return response?.data || undefined
}

export const requestUpdateReply = async(replyId: string, itemReplies: ItemReply[]) => {
  const response = await requestApi({
    method: 'patch',
    backUrl: `/guest/replies/${replyId}`,
    options: {
      data: {
        itemReplies: itemReplies
      }
    }
  })
  return response?.data || undefined
}

export const requestRepliesOfSurvey = async(surveyId: string) => {
  const response = await requestApi({
    method: 'get',
    backUrl: `/surveys/${surveyId}/replies`
  })
  return response?.data || undefined
}
