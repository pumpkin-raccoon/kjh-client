import SurveyBox from 'components/Survey/Box/SurveyBox'
import { Survey } from 'models/Survey'
import { useRouter } from 'next/dist/client/router'
import styles from './DashboardMySurvey.module.scss'

const DashboardMySurvey = (props: {
  mySurveys: Survey[]
}) => {
  const router = useRouter()
  const {
    mySurveys
  } = props

  return (
    <div className={ styles.DashboardMySurvey }>
      {mySurveys.length > 0
        ?
        <div className={ styles.contents }>
          {mySurveys.map((survey: Survey) => (
            <button
              key={ survey.id }
              onClick={ () => router.push(`/survey/${survey.code}`) }
            >
              <SurveyBox
                className={ styles.survey_box }
                survey={ survey }
              />
            </button>
          ))}
        </div>
        :
        <div className={ styles.empty_contents }>
          <p>
            작성한 설문이 없습니다.
          </p>
          <button
            onClick={ () => router.push('/survey/create') }
          >
            <p>설문 만들기</p>
          </button>
        </div>
      }
    </div>
  )
}

export default DashboardMySurvey
