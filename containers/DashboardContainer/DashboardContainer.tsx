import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { DEFAULT_PROFILE_PATH } from 'reference/profile'
import { useEffect, useState } from 'react'
import styles from './DashboardContainer.module.scss'
import DashboardMySurvey from './MySurvey/DashboardMySurvey'
import { useRouter } from 'next/dist/client/router'
import DashboardContainerResponse from './Response/DashboardContainerResponse'

type DashboardTab = 'mySurvey' | 'myResponse'

const DashboardContainer = (props: {
  targetSurveyId?: string
  surveys: Survey[]
  currentUser: User
}) => {
  const router = useRouter()
  const {
    targetSurveyId,
    surveys,
    currentUser
  } = props
  const [ currentTab, setCurrentTab ] = useState<DashboardTab>(targetSurveyId ? 'myResponse' : 'mySurvey')

  useEffect(() => {
    if (targetSurveyId) {
      setCurrentTab('myResponse')
    }
  }, [ targetSurveyId ])

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
          ? 
          <DashboardMySurvey 
            mySurveys={ surveys }
          />
          : 
          <DashboardContainerResponse 
            mySurveys={ surveys }
            targetSurveyId={ targetSurveyId }
          />
        }
      </div>
    </div>
  )
}

export default DashboardContainer
