import { useToast } from '@chakra-ui/react'
import { QuestionReply, Reply } from 'models/Reply'
import { Survey } from 'models/Survey'
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { requestRepliesOfSurvey } from 'utils/api/reply'
import styles from './DashboardContainerResponse.module.scss'
import { useMemo } from 'react'
import { getLabelTextByQuestionType } from 'utils/question'
import { QuestionType } from 'models/Question'
import Dropdown from 'components/Dropdown/Dropdown'
import { useRouter } from 'next/dist/client/router'

type DashboardContainerResponseProps = {
  mySurveys: Survey[]
  targetSurveyId?: string
}

const DashboardContainerResponse = ({
  mySurveys,
  targetSurveyId
}: DashboardContainerResponseProps) => {
  const [ targetSurvey, setTargetSurvey ] = useState<Survey | null>(null)
  const [ targetReplies, setTargetReplies ] = useState<Reply[]>([])
  const toast = useToast()
  const router = useRouter()

  const updateSurveyAndReplies = async () => {
    if (mySurveys.length === 0) {
      return
    }
    const currentSurvey = targetSurveyId
      ? mySurveys.find((survey) => survey.id === targetSurveyId)
      : mySurveys[0]
    if (!currentSurvey) {
      toast({
        status: 'error',
        title: '해당 설문이 존재하지 않습니다',
        position: 'top',
        isClosable: true
      })
      return
    }
    setTargetSurvey(currentSurvey)
    await updateTargetReplies(currentSurvey.id)
  }

  const updateTargetReplies = async (surveyId: string) => {
    const replies = await requestRepliesOfSurvey(surveyId)
    if (!replies) {
      toast({
        status: 'error',
        title: '설문 응답 요청에 실패했습니다',
        isClosable: true
      })
    }
    setTargetReplies(replies)
  }

  useEffect(() => {
    updateSurveyAndReplies()
  }, [ targetSurveyId ])

  const questionReplies: QuestionReply[] = useMemo(() => {
    let targetQuestionReplies: QuestionReply[] = []
    targetReplies.forEach((reply) => {
      reply.itemReplies.forEach((itemReply) => {
        targetQuestionReplies = targetQuestionReplies.concat(itemReply.questionReplies)
      })
    })
    return targetQuestionReplies
  }, [ targetReplies ])

  const isInvalidSurvey = (survey: Survey) => {
    return !survey.validUntil || new Date() < new Date(survey.validUntil)
  }

  const getSurveyStatus = (survey: Survey) => {
    if (!survey.validUntil) {
      return '오류'
    }
    if (isInvalidSurvey(survey)) {
      return `${format(new Date(survey.validUntil), 'M/dd')} 이후 공개`
    }
    return `총 ${questionReplies.length}개의 답변`
  }

  const getQuestionReplyById = (questionId: string) => {
    return questionReplies.filter((questionReply) => {
      return questionReply.questionId === questionId
    })
  }

  const getClassnameByQuestionType = (questionType: QuestionType) => {
    switch(questionType) {
      case QuestionType.GREEN:
        return styles.continue
      case QuestionType.RED:
        return styles.stop
      case QuestionType.YELLOW:
      default:
        return styles.new
    }
  }

  return (
    <div>
      <div className={ styles.filter }>
        <Dropdown 
          className={ styles.dropdown }
          closeAfterClick
          targetItems={ mySurveys }
          renderKey="title"
          currentItem={ targetSurvey || undefined }
          currentValue={ targetSurvey
            ? undefined
            : '설문 선택하기'
          }
          selectItem={ (survey) => {
            router.push({
              pathname: '/dashboard',
              query: { 
                sId: survey.id  
              }
            })
          } }
        />
      </div>

      {targetSurvey && !isInvalidSurvey(targetSurvey)
        ?
        <div className={ styles.contents }>
          <div className={ styles.survey }>
            <h2 className={ styles.title }>
              {targetSurvey.items[0].title}
            </h2>
            <p className={ styles.status }>
              {getSurveyStatus(targetSurvey)}
            </p>
          </div>

          <div className={ styles.questions }>
            {targetSurvey.items[0].questions.map((surveyQuestion) => (
              <div
                className={ styles.question }
                key={ surveyQuestion.id }
              >
                <p className={ `${styles.question_label} ${getClassnameByQuestionType(surveyQuestion.type)}` }>
                  ({getLabelTextByQuestionType(surveyQuestion.type)})
                  &nbsp;
                  {surveyQuestion.content}
                </p>

                {getQuestionReplyById(surveyQuestion.id).length > 0
                  ?
                  <ul>
                    {getQuestionReplyById(surveyQuestion.id).map((questionReply, index) => (
                      <li
                        className={ `${styles.reply} ${getClassnameByQuestionType(surveyQuestion.type)}` }
                        key={ index }
                      >
                        {questionReply.content}
                      </li>
                    ))}
                  </ul>
                  :
                  <div className={ `${styles.reply} ${styles.empty} ${getClassnameByQuestionType(surveyQuestion.type)}` }>
                    존재하는 답변이 없습니다.
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
        :
        <div className={ `${styles.contents} ${styles.empty}` }>
          <p>
            {targetSurvey && isInvalidSurvey(targetSurvey)
              ? '아직 응답 기한이 남은 설문입니다.'
              : '현재 선택된 설문이 없습니다.'
            }
          </p>
        </div>
      }
    </div>
  )
}

export default DashboardContainerResponse
