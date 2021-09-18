import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { NextPageContext } from 'next'
import SurveyParticipationContainer from 'containers/SurveyParticipationContainer/SurveyParticipationContainer'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { requestCurrentUser } from 'utils/api/auth'
import { requestSurveyByCode, requestSurveyOwnerByCode } from 'utils/api/survey'
import { requestCreateReply } from 'utils/api/reply'
import { Reply } from 'models/Reply'
import Error from 'components/Error/Error'

const SurveyParticipationPage = (props: {
  user: User | null
  survey: Survey | null
  surveyOwner: User | null
  reply: Reply | null
}) => {
  const {
    user,
    survey,
    surveyOwner,
    reply
  } = props
  const setUser = useSetRecoilState(currentUserState)
  if (user) {
    setUser(user)
  }

  if (!survey || !surveyOwner || !reply) {
    return <Error message="잘못된 설문 코드입니다."/>
  }
  
  if (!survey.validUntil || new Date() > new Date(survey.validUntil)) {
    return <Error message="응답 기간이 지난 설문입니다."/>
  }

  return (
    <SurveyParticipationContainer
      user={ surveyOwner }
      survey={ survey }
      reply={ reply }
    />
  )
}

export default SurveyParticipationPage

export const getServerSideProps = async(ctx: NextPageContext) => {
  const surveyCode = ctx.query.code
  const survey = await requestSurveyByCode(surveyCode?.toString() || '', ctx)
  const surveyOwner = await requestSurveyOwnerByCode(surveyCode?.toString() || '', ctx)
  const user = await requestCurrentUser(ctx)
  let reply = null
  if (survey && surveyOwner) {
    reply = await requestCreateReply(survey.id)
  }
  return {
    props: {
      user: user || null,
      survey: survey || null,
      surveyOwner: surveyOwner || null,
      reply: reply
    }
  }
}
