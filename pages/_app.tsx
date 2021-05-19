import type { AppProps } from "next/app"
import "../styles/globals.css"
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
