import { getDefaultSurvey, Survey } from 'models/Survey'
import { getDefaultUser, User } from 'models/User'
import { NextPageContext } from 'next'
import SurveyParticipationContainer from 'containers/SurveyParticipationContainer/SurveyParticipationContainer'

const SurveyParticipationPage = (props: {
  user: User | null
  survey: Survey | null
}) => {
  const {
    user = getDefaultUser(),
    survey = getDefaultSurvey()
  } = props

  // TODO: add duplication check
  
  if (!user || !survey) {
    // TODO: block when there's no user and survey
    // return <></>
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
        content: '안녕하세요. 저는 호박너구리 이재하입니다. 여러분들의 솔직한 의견을 통해 스스로 더욱 발전하고 싶어요!'
      } } }
    />
  )
}

export default SurveyParticipationPage

export const getServerSideProps = async(ctx: NextPageContext) => {
  const surveyCode = ctx.query.code
  console.log('surveycode : ', surveyCode)
  // TODO: find survey by code
  // TODO: find user by survey
  return {
    props: {
      user: null,
      survey: null
    }
  }
}
