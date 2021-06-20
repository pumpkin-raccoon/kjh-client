import { getDefaultUser, User } from 'models/User'
import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

export const currentUserState: RecoilState<User> = atom({
  key: 'currentUserStateKey',
  default: getDefaultUser() as User
})

export const isUserLoggedInState: RecoilValueReadOnly<boolean> = selector({
  key: 'isUserLoggedInState',
  get: ({ get }) => {
    const user = get(currentUserState)
    return Boolean(user.id)
  }
})
