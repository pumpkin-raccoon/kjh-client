import { Survey } from 'models/Survey'
import { User } from 'models/User'
import { useState } from 'react'
import SurveyParticipationContainerIntroduction from './Introduction/SurveyParticipationContainerIntroduction'
import styles from './SurveyParticipationContainer.module.scss'
import SurveyParticipationContainerReply from './Reply/SurveyParticipationContainerReply'
import SurveyParticipationContainerComplete from './Complete/SurveyParticipationContainerComplete'
import { Reply } from 'models/Reply'

type SurveyParticipationStep = 'Introduction' | 'Participation' | 'Completion'

const SurveyParticipationContainer = (props: {
  user: User
  survey: Survey
  reply: Reply
}) => {
  const [ step, setStep ] = useState<SurveyParticipationStep>('Introduction')
  const {
    user,
    survey,
    reply
  } = props

  const moveToNextStep = () => {
    if (step === 'Introduction') {
      setStep('Participation')
    } else if (step === 'Participation') {
      setStep('Completion')
    }
  }

  return (
    <div className={ styles.SurveyParticipationContainer }>
      <div className={ styles.contents }>
        {step === 'Introduction' && 
          <SurveyParticipationContainerIntroduction
            user={ user }
            survey={ survey }
            moveToNextStep={ moveToNextStep }
          />
        }
        {step === 'Participation' &&
          <SurveyParticipationContainerReply 
            survey={ survey }
            moveToNextStep={ moveToNextStep }
            reply={ reply }
          />
        }
        {step === 'Completion' &&
          <SurveyParticipationContainerComplete />
        }
      </div>
    </div>
  )
}

export default SurveyParticipationContainer
