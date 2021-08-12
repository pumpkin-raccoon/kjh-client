import SurveyLayout from 'components/Survey/Layout/SurveyLayout'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import styles from './SurveyCreateContainer.module.scss'
import { getDefaultSurvey, Survey } from 'models/Survey'
import SurveyForm from 'components/Survey/SurveyForm/SurveyForm'
import { getDefaultSurveyItem } from 'models/SurveyItem'
import { getDefaultQuestion, QuestionType } from 'models/Question'
import { ValidationResult } from 'utils/validate'
import { useToast } from '@chakra-ui/react'
import { requestCreateSurvey } from 'utils/api/survey'

const DEFAULT_SURVEY: Survey = { 
  ...getDefaultSurvey(),
  items: [ {
    ...getDefaultSurveyItem(),
    questions: [
      {
        ...getDefaultQuestion(),
        type: QuestionType.GREEN
      }, {
        ...getDefaultQuestion(),
        type: QuestionType.RED
      }, {
        ...getDefaultQuestion(),
        type: QuestionType.YELLOW
      }
    ]
  } ]
}

const SurveyCreateContainer = () => {
  const toast = useToast()
  const currentUser = useRecoilValue(currentUserState)
  const router = useRouter()
  const [ targetSurvey, setTargetSurvey ] = useState<Survey>(DEFAULT_SURVEY)
  const {
    title,
    validUntil,
    content,
    items
  } = targetSurvey

  const createSurvey = async() => {
    const surveyValidation = validateInputs()
    if (!surveyValidation.isValid) {
      toast({
        title: surveyValidation.message,
        status: 'error',
        isClosable: true
      })
      return
    }
    const responseSurvey = await requestCreateSurvey({
      title,
      content,
      surveyItems: items.map(item => {
        return {
          content: item.content,
          title: item.title,
          questions: item.questions.map(question => {
            return {
              type: question.type,
              content: question.content
            }
          })
        }
      }),
      validUntil: validUntil
        ? new Date(validUntil).toISOString()
        : undefined
    })
    if (responseSurvey) {
      toast({
        status: 'success',
        title: '서베이를 생성했습니다.',
        position: 'top',
        isClosable: true
      })
      setTargetSurvey(responseSurvey)
      router.push('/dashboard')
    } else {
      toast({
        status: 'error',
        title: '생성에 오류가 발생했습니다.',
        position: 'top',
        isClosable: true
      })
    }
  }

  const validateInputs = (): ValidationResult => {
    if (!title || !validUntil || !content) {
      return {
        isValid: false,
        message: '빈 값을 채워주세요.'
      }
    }
    const firstItem = items[0]
    if (!firstItem || !firstItem.title) {
      return {
        isValid: false,
        message: '설문 주제와 항목을 모두 입력해 주세요.'
      }
    }
    return {
      isValid: true,
      message: ''
    }
  }

  return (
    <SurveyLayout
      title={ `${currentUser.name}의 설문` }
      leftButton={ {
        type: 'arrow',
        onClick: () => router.push('/dashboard')
      } }
      rightButton={ {
        type: 'square',
        onClick: () => createSurvey(),
        element: '생성'
      } }
    >
      <div className={ styles.SurveyCreateContainer }>
        <SurveyForm 
          survey={ targetSurvey }
          setSurvey={ setTargetSurvey }
        />
      </div>
    </SurveyLayout>
  )
}

export default SurveyCreateContainer
