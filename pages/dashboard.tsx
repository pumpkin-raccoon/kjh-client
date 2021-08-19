import Layout from 'components/Layout/Layout'
import DashboardContainer from 'containers/DashboardContainer/DashboardContainer'
import { useRouter } from 'next/dist/client/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isUserLoggedInState } from 'states/currentUser'
import { loadingState } from 'states/loading'
import { isRenderingClient } from 'utils/window'

const DashboardPage = () => {
  const router = useRouter()
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)
  const setLoading = useSetRecoilState(loadingState)

  if (!isUserLoggedIn) {
    setLoading({
      isLoading: true
    })
    if (isRenderingClient) {
      router.push('/')
    }
    return <></>
  }

  return (
    <Layout>
      <DashboardContainer 
        targetSurveyId={ router.query?.sId?.toString() || undefined }
      />
    </Layout>
  )
}

export default DashboardPage
