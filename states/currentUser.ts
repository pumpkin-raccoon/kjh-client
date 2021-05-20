import { getDefaultUser, User } from "models/User"
import { atom, RecoilState } from "recoil"

export interface CurrentUserState {
  isLoggedIn: boolean
  currentUser: User
}

export const currentUserState: RecoilState<CurrentUserState> = atom({
  key: "currentUserStateKey",
  default: {
    isLoggedIn: false as boolean,
    currentUser: getDefaultUser() as User,
  },
})
