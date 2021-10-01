import SurveyCreateContainer from 'containers/SurveyCreateContainer/SurveyCreateContainer'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { isUserLoggedInState } from 'states/currentUser'

const SurveyCreatePage = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)

  if (isUserLoggedIn || process.env.NODE_ENV === 'development') {
    const title = '설문 만들기 | 트래피커'
    const description = '효율적인 피드백을 위한 나만의 설문을 만들어 보세요.'

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={ title }/>
          <meta name="description" content={ description }/>
          <meta property="og:description" content={ description }/>
        </Head>
        <SurveyCreateContainer />
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

export default SurveyCreatePage
