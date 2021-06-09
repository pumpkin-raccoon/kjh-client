import { requestCurrentUser } from 'public/utils/api/auth'
import { COOKIE_NAME, getCookie } from 'public/utils/cookie'
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
        setCurrentUser({ 
          currentUser: user,
          isLoggedIn: true
        })
      }
    }
  }

  return (
    <></>
  )
}

export default Auth
