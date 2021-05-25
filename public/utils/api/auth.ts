import { User } from 'models/User'
import { requestApi } from '.'

export const requestSignUp = async (signUpInput: {
  email: string
  name: string
  password: string
}): Promise<boolean> => {
  const response = await requestApi({
    method: 'post',
    backUrl: '/auth/register',
    options: {
      data: JSON.stringify(signUpInput),
    },
  })
  const isSucess = Boolean(response.data)
  return isSucess
}

export const requestSignIn = async (signInInput: {
  email: string
  password: string
}): Promise<string | null> => {
  const response = await requestApi({
    method: 'post',
    backUrl: '/auth/signin',
    options: {
      data: JSON.stringify(signInInput),
    },
  })
  const jwt = response?.data?.jwt || null
  return jwt
}

export const requestCurrentUser = async (token?: string): Promise<User | null> => {
  const response = await requestApi({
    method: 'get',
    backUrl: '/auth/currentUser',
    options: {
      accessTokenOrCtx: token,
    },
  })
  const currentUser = response?.data || null
  return currentUser
}
