import { Survey } from 'models/Survey'
import styles from './SurveyForm.module.scss'
import RoundInput from 'components/Input/RoundInput/RoundInput'
import { SurveyItem } from 'models/SurveyItem'
import { Question, QuestionType } from 'models/Question'
import { getLabelTextByQuestionType } from 'utils/question'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useToast } from '@chakra-ui/react'

const SurveyForm = (props: {
  className?: string
  survey: Survey
  setSurvey: (value: Survey) => void
}) => {
  const {
    className = '',
    survey,
    setSurvey
  } = props
  const toast = useToast()

  const setSurveyByKey = (key: keyof Survey, value: Survey[keyof Survey]) => {
    if (key === 'validUntil' && typeof value === 'string' && new Date(value) < new Date()) {
      toast({
        title: '현재보다 이전 날짜는 입력할 수 없습니다.',
        status: 'error',
        isClosable: true
      })
      return
    }
    setSurvey({ ...survey, [key]: value })
  }

  const setSurveyItemByKeyAndIndex = (index: number, key: keyof SurveyItem, value: SurveyItem[keyof SurveyItem]) => {
    const targetSurveyItem: SurveyItem = { ...survey.items[index], [key]: value }
    const newSurveyItems: SurveyItem[] = [ ...survey.items ]
    newSurveyItems.splice(index, 1, targetSurveyItem)
    setSurveyByKey('items', newSurveyItems)
  }

  const setQuestionByKeyAndIndex = (questionIndex: number, itemIndex: number, key: keyof Question, value: Question[keyof Question]) => {
    const targetQuestion: Question = { ...survey.items[itemIndex].questions[questionIndex], [key]: value }
    const newQuestions: Question[] = [ ...survey.items[itemIndex].questions ]
    newQuestions.splice(questionIndex, 1, targetQuestion)
    setSurveyItemByKeyAndIndex(itemIndex, 'questions', newQuestions)
  }

  const getQuestionPlaceholderByType = (questionType: QuestionType): string => {
    switch(questionType) {
      case QuestionType.GREEN:
        return 'ex. 계속 이어나갔으면 하는 점을 알려주세요.'
      case QuestionType.YELLOW:
        return 'ex. 추가로 제안하고 싶은 점을 알려주세요.'
      case QuestionType.RED:
        return 'ex. 개선했으면 하는 점을 알려주세요.'
      default:
        return ''
    }
  }

  return (
    <div className={ className }>
      <div className={ styles.box }>
        <div className={ styles.input_group }>
          <p>제목</p>
          <RoundInput
            value={ survey.title }
            setValue={ (value) => setSurveyByKey('title', value?.toString()) }
            placeholder={ 'ex. 트래피커의 설문' }
          />
        </div>
        <div className={ styles.input_group }>
          <p>내용 (응답하는 분들을 위한 메시지)</p>
          <RoundInput 
            className={ styles.textarea }
            value={ survey.content }
            setValue={ (value) => setSurveyByKey('content', value?.toString()) }
            placeholder={ '설문을 시작하기 전에 확인하는 내용입니다.' }
            isTextarea
          />
        </div>
        <div className={ styles.input_group }>
          <p>마감일</p>
          <DatePicker
            showTimeSelect
            className={ styles.date_picker }
            showYearDropdown
            isClearable
            dateFormat="yyyy.MM.dd h:mm a"
            selected={ survey.validUntil
              ? new Date(survey.validUntil) 
              : undefined
            }
            onChange={ (date: Date) => {
              const targetDate = date
                ? new Date(date)?.toISOString()
                : undefined
              setSurveyByKey('validUntil', targetDate)
            } }
          />
        </div>
      </div>

      {survey.items.map((surveyItem: SurveyItem, index: number) => (
        <div
          className={ styles.box }
          key={ surveyItem.id + index.toString() }
        >
          <div className={ styles.input_group }>
            <p>설문 주제</p>
            <RoundInput 
              value={ surveyItem.title }
              setValue={ (value) => setSurveyItemByKeyAndIndex(index, 'title', value?.toString()) }
              placeholder={ 'ex. 업무로서의 저는 어떤 사람인가요?' }
            />
          </div>
          
          <div className={ styles.input_group }>
            <p>설문 항목</p>
            {surveyItem.questions.map((question: Question, questionIndex: number) => (
              <RoundInput
                className={ styles.question_input }
                key={ question.id + questionIndex.toString() }
                placeholder={ getQuestionPlaceholderByType(question.type) }
                value={ question.content }
                setValue={ (value) => setQuestionByKeyAndIndex(questionIndex, index, 'content', value.toString()) }
                labelText={ getLabelTextByQuestionType(question.type) }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SurveyForm
