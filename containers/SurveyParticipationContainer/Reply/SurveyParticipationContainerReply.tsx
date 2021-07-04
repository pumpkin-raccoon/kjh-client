import styles from './SurveyParticipationContainerReply.module.scss'
import SurveyReply from 'components/Survey/Reply/SurveyReply'

const SurveyParticipationContainerReply = (props: {
  moveToNextStep: () => void
}) => {
  const {
    moveToNextStep
  } = props

  return (
    <div className={ styles.SurveyParticipationContainerReply }>
      <SurveyReply
        className={ styles.box }
      />

      <button 
        onClick={ moveToNextStep }
        className={ styles.button }
      >
        제출하기
      </button>
    </div>
  )
}

export default SurveyParticipationContainerReply
