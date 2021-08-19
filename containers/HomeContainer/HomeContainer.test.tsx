import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import HomeContainer from './HomeContainer'

describe('HomeContainer', () => {
  it('matches snapshot', () => {
    const utils = render(
      <RecoilRoot>
        <HomeContainer />
      </RecoilRoot>)
    expect(utils.container).toMatchSnapshot()
  })
})
