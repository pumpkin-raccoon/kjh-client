import RoundInput from 'components/Input/RoundInput/RoundInput'
import styles from './SurveyReply.module.scss'

const SurveyReply = (props: {
  className?: string
}) => {
  const {
    className
  } = props

  return (
    <div className={ `${styles.SurveyReply} ${className}` }>
      <h2 className={ styles.title }>
        제목입니다.
      </h2>
      <div>
        <RoundInput 
          className={ styles.input }
          value=""
          setValue={ () => {} }
          placeholder="계속 가져갔으면 하는 점을 적어주세요."
          labelText="Continue"
        />
        <RoundInput 
          className={ styles.input }
          value=""
          setValue={ () => {} }
          placeholder="개선했으면 하는 점을 적어주세요."
          labelText="Stop"
        />
        <RoundInput 
          className={ styles.input }
          value=""
          setValue={ () => {} }
          placeholder="추가로 제안하고 싶은 점을 적어주세요."
          labelText="New"
        />
      </div>
    </div>
  )
}

export default SurveyReply
