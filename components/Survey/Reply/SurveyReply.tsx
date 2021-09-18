import RoundInput from 'components/Input/RoundInput/RoundInput'
import { Question } from 'models/Question'
import { ItemReply } from 'models/Reply'
import { SurveyItem } from 'models/SurveyItem'
import { SetStateAction } from 'react'
import { getLabelTextByQuestionType } from 'utils/question'
import styles from './SurveyReply.module.scss'

const SurveyReply = (props: {
  className?: string
  surveyItem: SurveyItem
  surveyItemReply: ItemReply
  setSurveyItemReply: React.Dispatch<SetStateAction<ItemReply>>
}) => {
  const {
    className,
    surveyItem,
    surveyItemReply,
    setSurveyItemReply
  } = props

  const updateQuestionContent = (index: number, content: string) => {
    const targetSurveyItem = { ...surveyItemReply }
    targetSurveyItem.questionReplies[index].content = content
    setSurveyItemReply(targetSurveyItem)
  }

  return (
    <div className={ `${styles.SurveyReply} ${className}` }>
      <h2 className={ styles.title }>
        { surveyItem.title }
      </h2>
      <div>
        {surveyItem.questions.map((question: Question, index: number) => (
          <RoundInput 
            isTextarea={ true }
            key={ question.id }
            className={ styles.input }
            value={ surveyItemReply.questionReplies[index].content }
            setValue={ (value) => {
              updateQuestionContent(index, value?.toString())
            } }
            placeholder={ question.content }
            labelText={ `(${getLabelTextByQuestionType(question.type)}) ${question.content}` }
          />
        ))}
      </div>
    </div>
  )
}

export default SurveyReply
