import { fireEvent, render, waitFor } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { PopupState, popupState } from 'states/popup'
import SignUpPopup from './SignUpPopup'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { API } from 'reference/API'
import { authHandlers } from 'tests/__mocks__/auth'

describe('SignUpPopup', () => {
  const server = setupServer(...authHandlers)
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  const component = (
    <RecoilRoot initializeState={ ({ set }: MutableSnapshot) => {
      set(popupState, {
        openedPopups: [ 'signUp' ]
      } as PopupState)
    } }>
      <SignUpPopup />
    </RecoilRoot>
  )

  it('matches snapshot', () => {
    const utils = render(component)
    expect(utils.container).toMatchSnapshot()
  })

  it('set signUpInput and check signUp process is passed', async() => {
    const { getByLabelText, getByText } = render(component)
    const nameInput = getByLabelText('이름')
    const emailInput = getByLabelText('이메일')
    const passwordInput = getByLabelText('비밀번호')
    const confirmedPasswordInput = getByLabelText('비밀번호 확인')
    const button = getByText('시작하기')

    // set inputs - only name and email
    fireEvent.change(nameInput, { target: { value: '테스트' } })
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.click(button)
    getByText('비어있는 값이 있습니다.')

    // set inputs - password is not confirmed
    fireEvent.change(passwordInput, { target: { value: 'testtest123' } })
    fireEvent.change(confirmedPasswordInput, { target: { value: 'testtest1234' } })
    fireEvent.click(button)
    getByText('비밀번호가 일치하지 않습니다.')

    // set inputs - same password, but invalid email
    fireEvent.change(emailInput, { target: { value: 'usertest.com' } })
    fireEvent.change(confirmedPasswordInput, { target: { value: 'testtest123' } })
    fireEvent.click(button)
    getByText('올바른 이메일 형식이 아닙니다.')

    // pass input validation check - but register fails
    server.use(
      rest.post(API.SERVER + '/auth/register', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(false)
        )
      }),
    )
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.click(button)
    await waitFor(() => {
      getByText('회원가입에 오류가 발생했습니다.')
    })

    // pass register and signIn
    // don't know how to check
    server.use(
      rest.post(API.SERVER + '/auth/register', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(true)
        )
      }),
    )
    fireEvent.click(button)
  })
})
