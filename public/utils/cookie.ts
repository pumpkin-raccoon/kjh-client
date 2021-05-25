import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const setTokenInCookie = (token: string) => {
  setCookie(COOKIE_NAME.token, token, {
    path: '/',
    secure: true,
    sameSite: 'none',
  })
}

export const COOKIE_NAME = {
  token: 'TAT',
}
