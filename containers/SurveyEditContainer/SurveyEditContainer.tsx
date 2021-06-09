import SurveyLayout from 'components/Survey/Layout/SurveyLayout'
import { SurveyItemTemplate } from 'models/SurveyItem'
import { useRouter } from 'next/dist/client/router'
import { requestSurveyTemplates } from 'public/utils/api/survey'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const SurveyEditContainer = () => {
  const [ templates, setTemplates ] = useState<SurveyItemTemplate[]>([])
  const currentUser = useRecoilValue(currentUserState)
  const router = useRouter()

  useEffect(() => {
    getAndSetSurveyTemplates()
  }, [])

  const getAndSetSurveyTemplates = async() => {
    const responseTemplates = await requestSurveyTemplates()
    if (responseTemplates) {
      setTemplates(responseTemplates)
      console.log('temps : ', responseTemplates)
    }
  }

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
      title={ `${currentUser.currentUser.name}의 설문` }
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
      <div>
        {templates.map((temp: SurveyItemTemplate) => (
          <p key={ temp.id }>
            {temp.title}
          </p>
        ))}
      </div>
    </SurveyLayout>
  )
}

export default SurveyEditContainer
