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
import { copyToClipboard } from 'utils/clipboard'

const DEFAULT_SURVEY: Survey = { 
  ...getDefaultSurvey(),
  content: '안녕하세요, 피드백에 참가해주셔서 정말 감사합니다! 저는 성장하고 발전하기 위해 이번 피드백을 시작했습니다. 어떤 피드백이라도 감사히 받아들일 마음의 준비가 되어 있으니, 저를 위해 솔직하게 응답해주시면 감사하겠습니다 :)',
  items: [ {
    ...getDefaultSurveyItem(),
    questions: [
      {
        ...getDefaultQuestion(),
        type: QuestionType.GREEN,
        content: '계속 이어나갔으면 하는 점을 알려주세요.'
      }, {
        ...getDefaultQuestion(),
        type: QuestionType.RED,
        content: '개선했으면 하는 점을 알려주세요.'
      }, {
        ...getDefaultQuestion(),
        type: QuestionType.YELLOW,
        content: '추가로 제안하고 싶은 점을 알려주세요.'
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
      copyToClipboard(window.location.origin + `/survey/${responseSurvey.code}/reply`)
      toast({
        status: 'success',
        title: '서베이 공유 링크가 클립보드에 복사되었습니다.',
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
        <p className={ styles.notice }>
          ※ 설문 결과는 마감일 이후에 확인하실 수 있습니다.
        </p>
      </div>
    </SurveyLayout>
  )
}

export default SurveyCreateContainer
