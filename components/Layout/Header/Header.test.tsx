import { fireEvent, render } from '@testing-library/react'
import { getDefaultUser } from 'models/User'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { currentUserState } from 'states/currentUser'
import Header from './Header'

describe('Header', () => {
  it('matches snapshot', () => {
    const utils = render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })

  it('has login and signup button when user is not logged in', () => {
    const { getByText } = render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    )
    const signUpButton = getByText('지금 시작하기')
    fireEvent.click(signUpButton)

    const signInButton = getByText('로그인')
    fireEvent.click(signInButton)
  })

  it('has logout button when user logged in', () => {
    const { getByText } = render(
      <RecoilRoot initializeState={ ({ set }: MutableSnapshot) => {
        set(currentUserState, { ...getDefaultUser(), ...{ id: 'test' } })
      } }>
        <Header />
      </RecoilRoot>
    )
    const logoutButton = getByText('로그아웃')
    fireEvent.click(logoutButton)
    getByText('로그인')
  })
})
