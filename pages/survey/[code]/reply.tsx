import { getDefaultSurvey, Survey } from 'models/Survey'
import { getDefaultUser, User } from 'models/User'
import { NextPageContext } from 'next'
import SurveyParticipationContainer from 'containers/SurveyParticipationContainer/SurveyParticipationContainer'
import { getDefaultSurveyItem } from 'models/SurveyItem'
import { getDefaultQuestion, QuestionType } from 'models/Question'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { useToast } from '@chakra-ui/react'
import { requestCurrentUser } from 'utils/api/auth'
import { requestSurveyByCode } from 'utils/api/survey'

const SurveyParticipationPage = (props: {
  user: User | null
  survey: Survey | null
}) => {
  const {
    user,
    survey
  } = props
  const toast = useToast()
  const setUser = useSetRecoilState(currentUserState)
  if (user) {
    setUser(user)
  }

  // TODO: add duplication check
  
  if (!survey) {
    toast({
      status: 'error',
      title: '잘못된 설문 코드입니다.',
      isClosable: true
    })
    return <></>
  }

  return (
    <SurveyParticipationContainer
      user={ { ...getDefaultUser(), ...{
        name: '이재하',
        profile: {
          greetings: '매일매일 성장하는 호박너구리',
          photoUrl: ''
        }
      } } }
      survey={ { ...getDefaultSurvey(), ...{
        content: '안녕하세요. 저는 호박너구리 이재하입니다. 여러분들의 솔직한 의견을 통해 스스로 더욱 발전하고 싶어요!',
        items: [
          { ...getDefaultSurveyItem(), ...{
            id: '123',
            title: '업무로서의 재하는?',
            content: 'asdfasdf',
            questions: [
              { ...getDefaultQuestion(), ...{
                id: '1231',
                type: QuestionType.GREEN,
                content: 'asdfasdf'
              } }
            ]
          } }
        ]
      } } }
    />
  )
}

export default SurveyParticipationPage

export const getServerSideProps = async(ctx: NextPageContext) => {
  const surveyCode = ctx.query.code
  const survey = await requestSurveyByCode(surveyCode?.toString() || '', ctx)
  const user = await requestCurrentUser(ctx)
  return {
    props: {
      user: user || null,
      survey: survey || null
    }
  }
}
