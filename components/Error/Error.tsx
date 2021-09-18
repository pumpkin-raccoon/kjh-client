import { useRouter } from 'next/dist/client/router'
import styles from './Error.module.scss'

type ErrorProps = {
  message: string
}

const Error = ({
  message
}: ErrorProps) => {
  const router = useRouter()
  
  return (
    <div className={ styles.Error }>
      <div className={ styles.contents }>
        <h2 className={ styles.message }>
          {message}
        </h2>

        <div className={ styles.suggestion }>
          <p>
            솔직한 피드백을 위한<br/>
            나만의 설문을 만들어 보세요!
          </p>
          <button onClick={ () => router.push('/') }>
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error
