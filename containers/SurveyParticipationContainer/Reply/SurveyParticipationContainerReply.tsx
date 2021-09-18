import styles from './SurveyParticipationContainerReply.module.scss'
import SurveyReply from 'components/Survey/Reply/SurveyReply'
import { Survey } from 'models/Survey'
import { ItemReply, QuestionReply, Reply } from 'models/Reply'
import { useState } from 'react'
import { Question } from 'models/Question'
import { requestUpdateReply } from 'utils/api/reply'
import { useToast } from '@chakra-ui/react'

const SurveyParticipationContainerReply = (props: {
  moveToNextStep: () => void
  survey: Survey
  reply: Reply
}) => {
  const toast = useToast()
  const {
    moveToNextStep,
    survey,
    reply
  } = props

  const [ surveyItemReply, setSurveyItemReply ] = useState<ItemReply>({
    surveyItemId: survey.items[0].id!,
    questionReplies: survey.items[0].questions.map((question: Question) => {
      const questionReply: QuestionReply = {
        questionId: question.id,
        content: ''
      }
      return questionReply
    })
  })

  const submitReply = async () => {
    const response = await requestUpdateReply(reply.id, [ surveyItemReply ])
    if (response) {
      moveToNextStep()
    } else {
      toast({
        status: 'error',
        title: '설문 제출에 오류가 발생했습니다.',
        position: 'top',
        isClosable: true
      })
    }
  }

  return (
    <div className={ styles.SurveyParticipationContainerReply }>
      <SurveyReply
        className={ styles.box }
        surveyItem={ survey.items[0]! }
        surveyItemReply={ surveyItemReply }
        setSurveyItemReply={ setSurveyItemReply }
      />

      <button 
        onClick={ submitReply }
        className={ styles.button }
      >
        제출하기
      </button>
    </div>
  )
}

export default SurveyParticipationContainerReply
