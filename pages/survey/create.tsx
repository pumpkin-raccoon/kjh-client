import SurveyEditContainer from 'containers/SurveyEditContainer/SurveyEditContainer'
import { useRecoilValue } from 'recoil'
import { isUserLoggedInState } from 'states/currentUser'

const SurveyCreatePage = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)

  if (isUserLoggedIn || process.env.NODE_ENV === 'development') {
    return (
      <SurveyEditContainer />
    )
  } else {
    return (
      <></>
    )
  }
}

export default SurveyCreatePage
