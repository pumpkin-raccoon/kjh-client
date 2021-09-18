import { format } from 'date-fns'
import { Survey } from 'models/Survey'
import { useMemo } from 'react'
import styles from './SurveyBox.module.scss'

const SurveyBox = (props: {
  className?: string
  survey: Survey
}) => {
  const {
    className = '',
    survey
  } = props

  const surveyStatus = useMemo(() => {
    if (!survey.validUntil) {
      return '오류'
    }
    if (new Date() < new Date(survey.validUntil)) {
      return `${format(new Date(survey.validUntil), 'M/dd h:mm a')} 이후 공개`
    }
    return '설문 완료'
  }, [ survey ])

  const surveyStatusColor = useMemo(() => {
    if (!survey.validUntil) {
      return styles.red
    }
    if (new Date() < new Date(survey.validUntil)) {
      return styles.purple
    }
    return styles.green
  }, [ survey ])

  const buttonProperty = useMemo(() => {
    if (!survey.validUntil) {
      return {
        text: '오류',
        className: styles.error
      }
    }
    if (new Date() < new Date(survey.validUntil)) {
      return {
        text: '링크복사',
        className: styles.copy_link
      }
    }
    return {
      text: '답변보기',
      className: styles.see_reply
    }
  }, [ survey ])

  return (
    <div className={ `${styles.SurveyBox} ${className}` }>
      <div className={ styles.meta }>
        <h3 className={ styles.title }>
          {survey.title.length > 25
            ? survey.title.slice(0, 25) + '...'
            : survey.title
          }
        </h3>

        <p className={ `${styles.status} ${surveyStatusColor}` }>
          {surveyStatus}
        </p>
      </div>

      <div className={ styles.info_row }>
        <button className={ `${styles.button} ${buttonProperty.className}` }>
          {buttonProperty.text}
        </button>
      </div>
    </div>
  )
}

export default SurveyBox
