import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { DEFAULT_PROFILE_PATH } from 'reference/profile'
import { requestUserSurveys } from 'utils/api/survey'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import styles from './DashboardContainer.module.scss'
import DashboardMySurvey from './MySurvey/DashboardMySurvey'
import { useRouter } from 'next/dist/client/router'

type DashboardTab = 'mySurvey' | 'myResponse'

const DashboardContainer = (props: {
  targetSurveyId?: string
}) => {
  const router = useRouter()
  const {
    targetSurveyId
  } = props
  const [ currentTab, setCurrentTab ] = useState<DashboardTab>(targetSurveyId ? 'myResponse' : 'mySurvey')
  const currentUser = useRecoilValue<User>(currentUserState)
  const [ userSurveys, setUserSurveys ] = useState<Survey[]>([])

  useEffect(() => {
    if (currentUser.id) {
      setUserSurveysByApi()
    }
  }, [ currentUser ])

  useEffect(() => {
    if (targetSurveyId) {
      setCurrentTab('myResponse')
    }
  }, [ targetSurveyId ])

  const setUserSurveysByApi = async() => {
    const responseSurveys = await requestUserSurveys(currentUser.id)
    if (responseSurveys) {
      setUserSurveys(responseSurveys)
    }
  }

  const onClickTab = (tab: DashboardTab) => {
    if (tab === 'mySurvey') {
      router.push({
        pathname: '/dashboard'
      })
    }
    setCurrentTab(tab)
  }

  return (
    <div>
      <div className={ styles.profile_background }/>
      <div className={ styles.profile_contents }>
        <div className={ styles.profile_image }>
          <img 
            alt='profile image'
            src={ currentUser.profile.photoUrl || DEFAULT_PROFILE_PATH }
          />
        </div>
        <h2 className={ styles.name }>
          {currentUser.name}
        </h2>
        <p className={ styles.description }>
          {currentUser.profile.greetings}
        </p>
      </div>

      <ul className={ styles.tabs }>
        <li>
          <button 
            onClick={ () => onClickTab('mySurvey') }
            className={ currentTab === 'mySurvey' ? styles.selected : '' }
          >
            내 설문
          </button>
        </li>
        <li>
          <button
            onClick={ () => onClickTab('myResponse') }
            className={ currentTab === 'myResponse' ? styles.selected : '' }
          >
            내 답변
          </button>
        </li>
      </ul>

      <div className={ styles.contents }>
        {currentTab === 'mySurvey'
          ? <DashboardMySurvey mySurveys={ userSurveys }/>
          : <div></div>
        }
      </div>
    </div>
  )
}

export default DashboardContainer
