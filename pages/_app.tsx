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
