import RoundInput from 'components/Input/RoundInput/RoundInput'
import SurveyLayout from 'components/Survey/Layout/SurveyLayout'
import { useRouter } from 'next/dist/client/router'
import { DEFAULT_PROFILE_PATH } from 'reference/profile'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import styles from './SurveyEditContainer.module.scss'

const SurveyEditContainer = () => {
  const currentUser = useRecoilValue(currentUserState)
  const router = useRouter()
  const [ testValue, setTestValue ] = useState('')

  const updateSurvey = async() => {
    // const responseSurvey = await requestCreateSurvey()
    // if (responseSurvey) {
    //   // success message and redirect
    // } else {
    //   // error message
    // }
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
        onClick: () => updateSurvey(),
        element: '생성'
      } }
    >
      <div className={ styles.SurveyEditContainer }>
        <div className={ styles.box }>
          <img 
            className={ styles.profile_image || DEFAULT_PROFILE_PATH }
            alt='profile image'
            src={ currentUser.profile.photoUrl }
          />
          <h2 className={ styles.title }>
            {currentUser.name}
          </h2>
          <p className={ styles.description }>
            {currentUser.profile.greetings}
          </p>
          <RoundInput 
            value={ testValue }
            setValue={ (value) => setTestValue(value?.toString()) }
            placeholder={ '설문을 응답하는 분들을 위한 메시지를 입력해 주세요.' }
          />
        </div>

        <div className={ styles.box }>
          <RoundInput 
            className={ styles.question_title }
            value={ testValue }
            setValue={ (value) => setTestValue(value?.toString()) }
            placeholder={ '포괄 질문을 입력해 주세요. (ex. 가나다라마)' }
          />
          <RoundInput 
            className={ styles.question_each }
            value={ testValue }
            setValue={ (value) => setTestValue(value?.toString()) }
            labelText={ 'continue' }
            placeholder={ '질문 설명을 입력해 주세요. (ex. 계속 이어나갔으면 하는 점을 알려주세요.)' }
          />
          <RoundInput 
            className={ styles.question_each }
            value={ testValue }
            setValue={ (value) => setTestValue(value?.toString()) }
            labelText={ 'stop' }
            placeholder={ '질문 설명을 입력해 주세요. (ex. 개선했으면 하는 점을 알려주세요.)' }
          />
          <RoundInput 
            className={ styles.question_each }
            value={ testValue }
            setValue={ (value) => setTestValue(value?.toString()) }
            labelText={ 'new' }
            placeholder={ '질문 설명을 입력해 주세요. (ex. 추가로 제안하고 싶은 점을 알려주세요.)' }
          />
        </div>
      </div>
    </SurveyLayout>
  )
}

export default SurveyEditContainer
