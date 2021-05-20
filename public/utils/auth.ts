import { User } from "models/User"
import { requestCurrentUser, requestSignIn } from "./api/auth"
import { setTokenInCookie } from "./cookie"

export const signInAndSetJwtToken = async (
  signInInput: {
    email: string
    password: string
  },
  callback?: (user: User) => void,
): Promise<{
  isSuccess: boolean
  message: string
}> => {
  const jwtToken = await requestSignIn({
    email: signInInput.email,
    password: signInInput.password,
  })
  if (jwtToken) {
    setTokenInCookie(jwtToken)
    const currentUser = await requestCurrentUser(jwtToken)
    if (currentUser) {
      if (callback) callback(currentUser)
      return {
        isSuccess: true,
        message: "",
      }
    } else {
      return {
        isSuccess: true,
        message: "현재 유저정보를 불러오는데 오류가 발생했습니다.",
      }
    }
  } else {
    return {
      isSuccess: false,
      message: "로그인 처리에 오류가 발생했습니다.",
    }
  }
}
