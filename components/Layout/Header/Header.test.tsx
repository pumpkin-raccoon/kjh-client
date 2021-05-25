import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
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
})
