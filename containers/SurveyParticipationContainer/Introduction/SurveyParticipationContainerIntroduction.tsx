import SurveyIntroduction from 'components/Survey/Introduction/SurveyIntroduction'
import { Survey } from 'models/Survey'
import { User } from 'models/User'
import styles from './SurveyParticipationContainerIntroduction.module.scss'

const SurveyParticipationContainerIntroduction = (props: {
  moveToNextStep: () => void
  user: User
  survey: Survey
}) => {
  const {
    moveToNextStep,
    user,
    survey
  } = props

  return (
    <div>
      <SurveyIntroduction 
        className={ styles.box }
        user={ user }
        survey={ survey }
      />

      <button 
        onClick={ () => moveToNextStep() }
        className={ styles.button }
      >
        피드백 남기기
      </button>
    </div>
  )
}

export default SurveyParticipationContainerIntroduction
