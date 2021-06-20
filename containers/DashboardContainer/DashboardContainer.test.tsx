import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import DashboardContainer from './DashboardContainer'

describe('DashboardContainer', () => {
  it('matches snapshot', () => {
    const utils = render(
      <RecoilRoot>
        <DashboardContainer />
      </RecoilRoot>
    )
    expect(utils.container).toMatchSnapshot()
  })
})
