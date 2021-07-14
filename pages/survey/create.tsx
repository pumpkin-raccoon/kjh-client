import SurveyCreateContainer from 'containers/SurveyCreateContainer/SurveyCreateContainer'
import { useRecoilValue } from 'recoil'
import { isUserLoggedInState } from 'states/currentUser'

const SurveyCreatePage = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)

  if (isUserLoggedIn || process.env.NODE_ENV === 'development') {
    return (
      <SurveyCreateContainer />
    )
  } else {
    return (
      <></>
    )
  }
}

export default SurveyCreatePage
