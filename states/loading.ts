import { atom, RecoilState } from 'recoil'

export interface LoadingState {
  isLoading: boolean
  title?: string
  message?: string
}

export const loadingState: RecoilState<LoadingState> = atom({
  key: 'loadingStateKey',
  default: {
    isLoading: false,
    title: '로딩중',
    message: undefined
  } as LoadingState
})
