import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { requestUserSurveys } from 'public/utils/api/survey'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import styles from './DashboardContainer.module.scss'
import DashboardMySurvey from './MySurvey/DashboardMySurvey'

type DashboardTab = 'mySurvey' | 'myResponse'

const DashboardContainer = () => {
  const [ currentTab, setCurrentTab ] = useState<DashboardTab>('mySurvey')
  const [ currentUser, setCurrentUser ] = useRecoilState<User>(currentUserState)
  const [ userSurveys, setUserSurveys ] = useState<Survey[]>([])
  console.log('temp : ', setCurrentUser)

  useEffect(() => {
    setUserSurveysByApi()
  }, [])

  const setUserSurveysByApi = async() => {
    const responseSurveys = await requestUserSurveys(currentUser.id)
    if (responseSurveys) {
      setUserSurveys(responseSurveys)
    }
  }

  return (
    <div>
      <div className={ styles.profile_background }/>
      <div className={ styles.profile_contents }>
        <div className={ styles.profile_image }>
          <img 
            alt='profile image'
            src={ currentUser.profile.photoUrl }
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
            onClick={ () => setCurrentTab('mySurvey') }
            className={ currentTab === 'mySurvey' ? styles.selected : '' }
          >
            내 설문
          </button>
        </li>
        <li>
          <button
            onClick={ () => setCurrentTab('myResponse') }
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
