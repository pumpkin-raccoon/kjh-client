import { fireEvent, render } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { popupState, PopupState } from 'states/popup'
import SignInPopup from './SignInPopup'

describe('SignInPopup', () => {
  const component = (
    <RecoilRoot initializeState={ ({ set }: MutableSnapshot) => {
      set(popupState, {
        openedPopups: [ 'signIn' ]
      } as PopupState)
    } }>
      <SignInPopup />
    </RecoilRoot>
  )

  it('matches snapshot', () => {
    const utils = render(component)
    expect(utils.container).toMatchSnapshot()
  })

  it('set signInInput and check signIn process is passed', async() => {
    const { getByLabelText, getByText } = render(component)
    const emailInput = getByLabelText('이메일')
    const passwordInput = getByLabelText('비밀번호')
    const button = getByText('시작하기')

    // set input - only valid email
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.click(button)
    getByText('비어있는 값이 있습니다.')

     // set all inputs - invalid email
     fireEvent.change(emailInput, { target: { value: 'usertest.com' } })
     fireEvent.change(passwordInput, { target: { value: 'testtest123' } })
     fireEvent.click(button)
     getByText('올바른 이메일 형식이 아닙니다.')

    // set all valid inputs
    // don't know how to check
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.click(button)
  })
})
