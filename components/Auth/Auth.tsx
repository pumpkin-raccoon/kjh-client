import { requestCurrentUser } from 'utils/api/auth'
import { COOKIE_NAME, getCookie } from 'utils/cookie'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Auth = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    updateCurrentUserByToken()
  }, [])

  const updateCurrentUserByToken = async () => {
    const token = getCookie(COOKIE_NAME.token)
    if (token) {
      const user = await requestCurrentUser(token)
      if (user) {
        setCurrentUser(user)
      }
    }
  }

  return (
    <></>
  )
}

export default Auth
