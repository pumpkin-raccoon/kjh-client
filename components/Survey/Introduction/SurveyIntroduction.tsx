import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { DEFAULT_PROFILE_PATH } from 'reference/profile'
import styles from './SurveyIntroduction.module.scss'

const SurveyIntroduction = (props: {
  className?: string
  user: User
  survey: Survey
}) => {
  const {
    className = '',
    user,
    survey
  } = props

  return (
    <div className={ `${styles.SurveyIntroduction} ${className}` }>
      <img
        alt='profile image'
        src={ user.profile?.photoUrl || DEFAULT_PROFILE_PATH }
        className={ styles.image }
      />
      <h2 className={ styles.name }>
        {user.name}
      </h2>
      <p className={ styles.description }>
        {user.profile?.greetings}
      </p>
      <div className={ styles.introduction }>
        {survey.content}
      </div>
    </div>
  )
}

export default SurveyIntroduction
