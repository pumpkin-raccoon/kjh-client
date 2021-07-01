import TextInput from 'components/Input/TextInput/TextInput'
import BoxPopup from 'components/Popup/BoxPopup/BoxPopup'
import { User } from 'models/User'
import { useRouter } from 'next/dist/client/router'
import { signInAndSetJwtToken } from 'utils/auth'
import { validate, ValidationResult } from 'utils/validate'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { popupState } from 'states/popup'
import styles from './SignInPopup.module.scss'

interface SignInInput {
  email: string
  password: string
}

const SignInPopup = () => {
  const router = useRouter()
  const setCurrentUser = useSetRecoilState(currentUserState)
  const [ popup, setPopup ] = useRecoilState(popupState)
  const [ errorMessage, setErrorMessage ] = useState<string>('')
  const [ signInInput, setSignInInput ] = useState<SignInInput>({
    email: '',
    password: '',
  })

  const setSignInInputByKey = (key: keyof SignInInput, value: SignInInput[keyof SignInInput]) => {
    const newInput = { ...signInInput }
    newInput[key] = value
    setSignInInput(newInput)
    setErrorMessage('')
  }

  const onClickSignIn = async () => {
    const inputValidation = validateInputs()
    if (inputValidation.isValid) {
      const signInAndSetTokenResposne = await signInAndSetJwtToken(
        {
          email: signInInput.email,
          password: signInInput.password,
        },
        (user: User) => {
          setCurrentUser(user)
          router.push('/dashboard')
        },
      )
      if (signInAndSetTokenResposne.isSuccess) {
        setPopup({ ...popup, ...{ openedPopups: [] } })
      } else {
        setErrorMessage(signInAndSetTokenResposne.message)
      }
    } else {
      setErrorMessage(inputValidation.message)
    }
  }

  const validateInputs = (): ValidationResult => {
    const { email, password } = signInInput
    if (!email || !password) {
      return {
        isValid: false,
        message: '비어있는 값이 있습니다.',
      }
    }
    const emailValidation = validate('email', email)
    if (!emailValidation.isValid) {
      return emailValidation
    }
    return {
      isValid: true,
      message: '',
    }
  }

  return (
    <BoxPopup popupTitle="signIn" className={ styles.popup }>
      <div className={ styles.contents }>
        <h2 className={ styles.title }>로그인</h2>
        <div className={ styles.form }>
          <TextInput
            className={ styles.input_with_label }
            value={ signInInput.email }
            setValue={ (value: string) => setSignInInputByKey('email', value) }
            labelText="이메일"
            placeholder="example@traffickr.com"
          />
          <TextInput
            className={ styles.input_with_label }
            value={ signInInput.password }
            setValue={ (value: string) => setSignInInputByKey('password', value) }
            labelText="비밀번호"
            placeholder="비밀번호"
          />
          <p className={ styles.error_message }>{errorMessage}</p>
        </div>

        <button className={ styles.button } onClick={ () => onClickSignIn() }>
          <p>시작하기</p>
        </button>

        <p className={ styles.to_sign_in }>
          서비스가 처음이신가요?&nbsp;
          <u onClick={ () => setPopup({ ...popup, ...{ openedPopups: [ 'signUp' ] } }) }>가입하기</u>
        </p>
      </div>
    </BoxPopup>
  )
}

export default SignInPopup
