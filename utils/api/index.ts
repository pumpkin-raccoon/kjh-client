import axios from 'axios'
import { API } from 'reference/API'
import { COOKIE_NAME, getCookie } from '../cookie'
import nextCookie from 'next-cookies'

export const requestApi = async (params: {
  method: 'post' | 'put' | 'delete' | 'get' | 'patch'
  backUrl: string
  options?: {
    data?: any
    accessTokenOrCtx?: any
  }
}) => {
  const { method, backUrl, options } = params
  let accessToken: string | undefined = ''
  switch (typeof options?.accessTokenOrCtx) {
    case 'string':
      accessToken = options?.accessTokenOrCtx
      break
    case 'undefined':
      accessToken = getCookie(COOKIE_NAME.token)
      break
    case 'object':
      accessToken = nextCookie(options?.accessTokenOrCtx)[COOKIE_NAME.token]
  }
  console.log('target url : ', (process.env.apiServer || API.SERVER) + backUrl)
  console.log('access token : ', accessToken)
  try {
    return await axios({
      method: method,
      url: (process.env.apiServer || API.SERVER) + backUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: options?.data,
    })
  } catch (err) {
    return {
      error: err,
      data: null,
    }
  }
}
