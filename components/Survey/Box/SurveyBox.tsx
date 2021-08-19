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

  const questionCount: number = useMemo(() => {
    let count = 0
    survey.items.forEach((surveyItem) => {
      count += surveyItem.questions.length
    })
    return count
  }, [ survey ])

  const surveyStatus = useMemo(() => {
    if (!survey.validUntil) {
      return '오류'
    }
    if (new Date() < new Date(survey.validUntil)) {
      return `${format(new Date(survey.validUntil), 'M/dd')} 이후 공개`
    }
    return '완료'
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

  const buttonText = useMemo(() => {
    if (!survey.validUntil) {
      return '오류'
    }
    if (new Date() < new Date(survey.validUntil)) {
      return '링크복사'
    }
    return '답변보기'
  }, [ survey ])

  return (
    <div className={ `${styles.SurveyBox} ${className}` }>
      <div className={ styles.meta }>
        <h3 className={ styles.title }>
          {survey.title}
        </h3>

        <button className={ styles.button }>
          {buttonText}
        </button>
      </div>

      <div className={ styles.info_row }>
        <p className={ `${styles.status} ${surveyStatusColor}` }>
          {surveyStatus}
        </p>
        <p className={ styles.item_length }>
          총 {questionCount}문항
        </p>
      </div>
    </div>
  )
}

export default SurveyBox
