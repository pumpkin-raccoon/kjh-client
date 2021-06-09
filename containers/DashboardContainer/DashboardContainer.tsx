import { getDefaultSurvey } from 'models/Survey'
import { getDefaultSurveyItem } from 'models/SurveyItem'
import { useState } from 'react'
import styles from './DashboardContainer.module.scss'
import DashboardMySurvey from './MySurvey/DashboardMySurvey'

type DashboardTab = 'mySurvey' | 'myResponse'

const DashboardContainer = () => {
  const [ currentTab, setCurrentTab ] = useState<DashboardTab>('mySurvey')

  return (
    <div>
      <div className={ styles.profile_background }/>
      <div className={ styles.profile_contents }>
        <div className={ styles.profile_image }>
          이미지
        </div>
        <h2 className={ styles.name }>
          이재하
        </h2>
        <p className={ styles.description }>
          매일매일 성장하는 호박너구리
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
          ? <DashboardMySurvey mySurveys={ [ { ...getDefaultSurvey(), ...{
            title: '예시 제목',
            items: [ getDefaultSurveyItem() ]
          } } ] }/>
          : <div></div>
        }
      </div>
    </div>
  )
}

export default DashboardContainer
