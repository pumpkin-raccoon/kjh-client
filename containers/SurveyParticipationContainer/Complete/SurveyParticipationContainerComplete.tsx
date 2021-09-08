import { useRouter } from 'next/dist/client/router'
import styles from './SurveyParticipationContainerComplete.module.scss'

const SurveyParticipationContainerComplete = () => {
  const router = useRouter()

  return (
    <div className={ styles.SurveyParticipationContainerComplete }>
      <img 
        className={ styles.image }
        alt='letter'
        src="/images/survey/letter.png"
      />
      <h2 className={ styles.title }>
        설문 완료!
      </h2>
      <div className={ styles.suggestion }>
        <p>
          나만의 설문을 만들고 싶다면?
        </p>
        <button onClick={ () => router.push('/') }>
          내 설문 만들기
        </button>
      </div>
    </div>
  )
}

export default SurveyParticipationContainerComplete
