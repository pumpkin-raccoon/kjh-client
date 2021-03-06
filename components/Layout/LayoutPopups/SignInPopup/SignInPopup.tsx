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
import { useToast } from '@chakra-ui/react'
import { loadingState } from 'states/loading'

interface SignInInput {
  email: string
  password: string
}

const SignInPopup = () => {
  const toast = useToast()
  const router = useRouter()
  const setLoading = useSetRecoilState(loadingState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const [ popup, setPopup ] = useRecoilState(popupState)
  const [ signInInput, setSignInInput ] = useState<SignInInput>({
    email: '',
    password: '',
  })

  const setSignInInputByKey = (key: keyof SignInInput, value: SignInInput[keyof SignInInput]) => {
    const newInput = { ...signInInput }
    newInput[key] = value.trim()
    setSignInInput(newInput)
  }

  const onClickSignIn = async () => {
    const inputValidation = validateInputs()
    if (!inputValidation.isValid) {
      toast({
        status: 'error',
        title: inputValidation.message,
        position: 'top',
        isClosable: true
      })
      return
    }
    setLoading({
      isLoading: true
    })
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
    setLoading({
      isLoading: false
    })
    if (!signInAndSetTokenResposne.isSuccess) {
      toast({
        status: 'error',
        title: signInAndSetTokenResposne.message,
        position: 'top',
        isClosable: true
      })
      return
    }
    setPopup({ ...popup, ...{ openedPopups: [] } })
    setSignInInput({
      email: '',
      password: ''
    })
  }

  const validateInputs = (): ValidationResult => {
    const { email, password } = signInInput
    if (!email || !password) {
      return {
        isValid: false,
        message: '???????????? ?????? ????????????.',
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
        <h2 className={ styles.title }>?????????</h2>
        <div className={ styles.form }>
          <TextInput
            className={ styles.input_with_label }
            value={ signInInput.email }
            setValue={ (value: string) => setSignInInputByKey('email', value) }
            labelText="?????????"
            placeholder="example@traffickr.com"
            pressEnter={ onClickSignIn }
          />
          <TextInput
            className={ styles.input_with_label }
            value={ signInInput.password }
            setValue={ (value: string) => setSignInInputByKey('password', value) }
            labelText="????????????"
            placeholder="????????????"
            type="password"
            pressEnter={ onClickSignIn }
          />
        </div>

        <button className={ styles.button } onClick={ () => onClickSignIn() }>
          <p>????????????</p>
        </button>

        <p className={ styles.to_sign_in }>
          ???????????? ???????????????????&nbsp;
          <u onClick={ () => setPopup({ ...popup, ...{ openedPopups: [ 'signUp' ] } }) }>????????????</u>
        </p>
      </div>
    </BoxPopup>
  )
}

export default SignInPopup
