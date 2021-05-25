import { atom, RecoilState } from 'recoil'

export interface PopupState {
  openedPopups: PopupTitle[]
}

export type PopupTitle = '' | 'signUp' | 'signIn'

export const popupState: RecoilState<PopupState> = atom({
  key: 'popupStateKey',
  default: {
    openedPopups: [ '' as PopupTitle ],
  },
})
