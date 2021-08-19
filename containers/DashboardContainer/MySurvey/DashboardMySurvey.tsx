import { useToast } from '@chakra-ui/react'
import SurveyBox from 'components/Survey/Box/SurveyBox'
import { Survey } from 'models/Survey'
import { useRouter } from 'next/dist/client/router'
import { copyToClipboard } from 'utils/clipboard'
import styles from './DashboardMySurvey.module.scss'

const DashboardMySurvey = (props: {
  mySurveys: Survey[]
}) => {
  const router = useRouter()
  const toast = useToast()
  const {
    mySurveys
  } = props

  const onClickSurveyBox = (survey: Survey) => {
    if (!survey.validUntil) {
      toast({
        status: 'error',
        title: '마감일이 없는 설문입니다.',
        position: 'top',
        isClosable: true
      })
      return
    }
    if (new Date() < new Date(survey.validUntil)) {
      copyToClipboard(window.location.origin + `/survey/${survey.code}/reply`)
      toast({
        status: 'success',
        title: '참여 링크가 클립보드에 복사되었습니다.\n설문 결과는 기간이 끝난 후에 확인하실 수 있습니다.',
        position: 'top',
        isClosable: true
      })
      return
    }
    // to see result
    router.push({
      pathname: '/dashboard',
      query: { 
        sId: survey.id  
      }
    })
  }

  const routeToSurveyCreatePage = () => {
    const waitingSurveys = mySurveys.map((survey) => {
      if (survey.validUntil && (new Date() < new Date(survey.validUntil))) {
        return survey
      }
    })
    const maximumWaitingCount = 2
    if (waitingSurveys.length >= maximumWaitingCount) {
      toast({
        status: 'error',
        title: `진행중인 설문이 ${maximumWaitingCount}개 이상입니다.`,
        position: 'top',
        isClosable: true
      })
      return
    }
    router.push('/survey/create')
  }

  return (
    <div className={ styles.DashboardMySurvey }>
      {mySurveys.length > 0
        ?
        <ul className={ styles.contents }>
          {mySurveys.map((survey: Survey) => (
            <li
              key={ survey.id }
              onClick={ () => onClickSurveyBox(survey) }
            >
              <SurveyBox
                survey={ survey }
              />
            </li>
          ))}
          <li
            className={ styles.survey_box_create }
            onClick={ () => routeToSurveyCreatePage() }
          >
            <p>+ 설문 만들기</p>
          </li>
        </ul>
        :
        <div className={ styles.empty_contents }>
          <p>
            작성한 설문이 없습니다.
          </p>
          <button
            onClick={ () => routeToSurveyCreatePage() }
          >
            <span>설문 만들기</span>
          </button>
        </div>
      }
    </div>
  )
}

export default DashboardMySurvey
