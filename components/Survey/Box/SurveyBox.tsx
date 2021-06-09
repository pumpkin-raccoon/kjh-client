import { Survey } from 'models/Survey'
import styles from './SurveyBox.module.scss'

const SurveyBox = (props: {
  className?: string
  survey: Survey
}) => {
  const {
    className = '',
    survey
  } = props

  return (
    <div className={ `${styles.SurveyBox} ${className}` }>
      <h3 className={ styles.title }>
        {survey.title}
      </h3>
      <div className={ styles.info_row }>
        <p className={ styles.item_length }>
          총 {survey.items.length}문항
        </p>
      </div>
    </div>
  )
}

export default SurveyBox
