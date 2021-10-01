import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import HomeContainer from '../containers/HomeContainer/HomeContainer'

const HomePage = () => {
  const title = '트래피커 | 성장을 위한 피드백 서비스'
  const description = '솔직한 피드백을 통해 방향성을 확인해 보세요. 마감 이후에 확인할 수 있는 익명성과 피드백에 초점을 맞춘 서비스!'

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={ title }/>
        <meta name="description" content={ description }/>
        <meta property="og:description" content={ description }/>
      </Head>
      <HomeContainer />
    </Layout>
  )
}

export default HomePage
