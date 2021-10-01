import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="images/website/favicon.ico" />
          
          <meta property="og:title" content="트래피커 | 성장을 위한 피드백 서비스"/>
          <meta property="og:description" content="솔직한 피드백을 통해 방향성을 확인해 보세요. 마감 이후에 확인할 수 있는 익명성과 피드백에 초점을 맞춘 서비스!"/>
          <meta property="og:image" content="images/website/og-image.png"/>
          <meta property="og:url" content="https://traffickr.kr/"/>

          <meta name="naver-site-verification" content="cebc856c0b8ddf34f92b59084ade2e29af1124c8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
