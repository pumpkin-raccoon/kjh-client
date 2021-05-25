import { render } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('matches snapshot', () => {
    const utils = render(<Footer />)
    expect(utils.container).toMatchSnapshot()
  })
})
