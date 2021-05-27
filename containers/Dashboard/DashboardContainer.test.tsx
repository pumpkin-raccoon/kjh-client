import { render } from '@testing-library/react'
import DashboardContainer from './DashboardContainer'

describe('DashboardContainer', () => {
  it('matches snapshot', () => {
    const utils = render(<DashboardContainer />)
    expect(utils.container).toMatchSnapshot()
  })
})
