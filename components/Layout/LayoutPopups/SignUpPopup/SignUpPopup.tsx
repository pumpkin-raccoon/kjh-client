import TextInput from "components/Input/TextInput/TextInput"
import BoxPopup from "components/Popup/BoxPopup/BoxPopup"
import { User } from "models/User"
import { requestSignUp } from "public/utils/api/auth"
import { signInAndSetJwtToken } from "public/utils/auth"
import { validate, ValidationResult } from "public/utils/validate"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { currentUserState } from "states/currentUser"
import { popupState } from "states/popup"
import styles from "./SignUpPopup.module.scss"

interface SignUpInput {
  name: string
  email: string
  password: string
  confirmedPassword: string
}

const SignUpPopup = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [popup, setPopup] = useRecoilState(popupState)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [signUpInput, setSignUpInput] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  })

  const setSignUpInputByKey = (key: keyof SignUpInput, value: SignUpInput[keyof SignUpInput]) => {
    const newInput = { ...signUpInput }
    newInput[key] = value
    setSignUpInput(newInput)
    setErrorMessage("")
  }

  const onClickSignUp = async () => {
    const inputValidation = validateInputs()
    if (inputValidation.isValid) {
      const signUpSuccess = await requestSignUp({
        email: signUpInput.email,
        name: signUpInput.name,
        password: signUpInput.password,
      })
      if (signUpSuccess) {
        const signInAndSetTokenResposne = await signInAndSetJwtToken(
          {
            email: signUpInput.email,
            password: signUpInput.password,
          },
          (user: User) => {
            setCurrentUser({
              ...currentUser,
              ...{
                isLoggedIn: true,
                currentUser: user,
              },
            })
          },
        )
        if (signInAndSetTokenResposne.isSuccess) {
          setPopup({ ...popup, ...{ openedPopups: [] } })
        } else {
          setErrorMessage(signInAndSetTokenResposne.message)
        }
      } else {
        setErrorMessage("회원가입에 오류가 발생했습니다.")
      }
    } else {
      setErrorMessage(inputValidation.message)
    }
  }

  const validateInputs = (): ValidationResult => {
    const { name, email, password, confirmedPassword } = signUpInput
    if (!name || !email || !password || !confirmedPassword) {
      return {
        isValid: false,
        message: "비어있는 값이 있습니다.",
      }
    }
    if (password !== confirmedPassword) {
      return {
        isValid: false,
        message: "비밀번호가 일치하지 않습니다.",
      }
    }
    const emailValidation = validate("email", email)
    if (!emailValidation.isValid) {
      return emailValidation
    }
    return {
      isValid: true,
      message: "",
    }
  }

  return (
    <BoxPopup popupTitle="signUp" className={styles.popup}>
      <div className={styles.contents}>
        <h2 className={styles.title}>회원가입</h2>
        <div className={styles.form}>
          <TextInput
            className={styles.input_with_label}
            value={signUpInput.name}
            setValue={(value: string) => setSignUpInputByKey("name", value)}
            labelText="이름"
            placeholder="이름"
          />
          <TextInput
            className={styles.input_with_label}
            value={signUpInput.email}
            setValue={(value: string) => setSignUpInputByKey("email", value)}
            labelText="이메일"
            placeholder="example@traffickr.com"
          />
          <TextInput
            className={styles.input_with_label}
            value={signUpInput.password}
            setValue={(value: string) => setSignUpInputByKey("password", value)}
            labelText="비밀번호"
            placeholder="비밀번호"
          />
          <TextInput
            className={styles.input_with_label}
            value={signUpInput.confirmedPassword}
            setValue={(value: string) => setSignUpInputByKey("confirmedPassword", value)}
            labelText="비밀번호 확인"
            placeholder="비밀번호 확인"
          />
          <p className={styles.error_message}>{errorMessage}</p>
        </div>

        <button className={styles.button} onClick={() => onClickSignUp()}>
          <p>시작하기</p>
        </button>

        <p className={styles.to_sign_in}>
          이미 회원이신가요?&nbsp;
          <u onClick={() => setPopup({ ...popup, ...{ openedPopups: ["signIn"] } })}>로그인하기</u>
        </p>
      </div>
    </BoxPopup>
  )
}

export default SignUpPopup
