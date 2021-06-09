import { getDefaultUser, User } from 'models/User'
// import { requestCurrentUser } from "public/utils/api/auth"
// import { COOKIE_NAME, getCookie } from "public/utils/cookie"
import { atom, RecoilState } from 'recoil'

export interface CurrentUserState {
  isLoggedIn: boolean
  currentUser: User
}

export const currentUserState: RecoilState<CurrentUserState> = atom({
  key: 'currentUserStateKey',
  default: {
    isLoggedIn: false as boolean,
    currentUser: getDefaultUser() as User,
    // currentUser: async () => {
    //   const token = getCookie(COOKIE_NAME.token)
    //   if (!token) return
    //   const user = await requestCurrentUser(token)
    //   if (user) {
    //     return user
    //   } else {
    //     return getDefaultUser()
    //   }
    // },
  },
})
