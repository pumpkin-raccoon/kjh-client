import { render } from '@testing-library/react'
import HomeContainer from './HomeContainer'

describe('HomeContainer', () => {
  it('matches snapshot', () => {
    const utils = render(<HomeContainer />)
    expect(utils.container).toMatchSnapshot()
  })
})
