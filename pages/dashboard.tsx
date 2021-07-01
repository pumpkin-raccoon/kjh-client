import Layout from 'components/Layout/Layout'
import DashboardContainer from 'containers/DashboardContainer/DashboardContainer'
import { useRecoilValue } from 'recoil'
import { isUserLoggedInState } from 'states/currentUser'

const DashboardPage = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)

  if (isUserLoggedIn || process.env.NODE_ENV === 'development') {
    return (
      <Layout>
        <DashboardContainer />
      </Layout>
    )
  } else {
    return (
      <></>
    )
  }
}

export default DashboardPage
