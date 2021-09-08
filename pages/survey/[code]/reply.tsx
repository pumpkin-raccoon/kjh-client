import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { NextPageContext } from 'next'
import SurveyParticipationContainer from 'containers/SurveyParticipationContainer/SurveyParticipationContainer'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { useToast } from '@chakra-ui/react'
import { requestCurrentUser } from 'utils/api/auth'
import { requestSurveyByCode, requestSurveyOwnerByCode } from 'utils/api/survey'
import { requestCreateReply } from 'utils/api/reply'
import { Reply } from 'models/Reply'

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
  console.log('props : ', props)
  const toast = useToast()
  const setUser = useSetRecoilState(currentUserState)
  if (user) {
    setUser(user)
  }

  // TODO: add duplication check
  
  if (!survey || !surveyOwner || !reply) {
    toast({
      status: 'error',
      title: '잘못된 설문 코드입니다.',
      isClosable: true
    })
    return <></>
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
