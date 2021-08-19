import Layout from 'components/Layout/Layout'
import DashboardContainer from 'containers/DashboardContainer/DashboardContainer'
import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUserState, isUserLoggedInState } from 'states/currentUser'
import { loadingState } from 'states/loading'
import { requestUserSurveys } from 'utils/api/survey'

const DashboardPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue<User>(currentUserState)
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)
  const setLoading = useSetRecoilState(loadingState)
  const [ userSurveys, setUserSurveys ] = useState<Survey[]>([])

  useEffect(() => {
    if (currentUser.id) {
      setUserSurveysByApi()
    }
  }, [ currentUser ])

  const setUserSurveysByApi = async() => {
    setLoading({ isLoading: true })
    const responseSurveys = await requestUserSurveys(currentUser.id)
    setLoading({ isLoading: false })
    if (responseSurveys) {
      setUserSurveys(responseSurveys)
    } else {
      router.push('/')
    }
  }

  if (!isUserLoggedIn) {
    return <></>
  }

  return (
    <Layout>
      <DashboardContainer 
        targetSurveyId={ router.query?.sId?.toString() || undefined }
        currentUser={ currentUser }
        surveys={ userSurveys }
      />
    </Layout>
  )
}

export default DashboardPage
