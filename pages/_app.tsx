import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import Auth from 'components/Auth/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth />
      <Component { ...pageProps } />
    </RecoilRoot>
  )
}

export default MyApp

// TODO for Front
// 1. survey respond page
// 2. adjust desgin when new field layout is added
// 3. add api to survey creation page
// 4. add api to survey response page
// 5. dashboard after design

// TODO for Design
// 1. survey respond page: light description color
// 2. survey respond page: user can see add our strength - survey owner cannot see response
// 3. add design considering new field - due date(?): create page, respond page, dashboard page
// 4. dashboard: my survey and my response

// TODO for API
// 0. login...?
// 1. survey create
// 2. respond to survey
// 3. get user by id
// 4. change profile image
