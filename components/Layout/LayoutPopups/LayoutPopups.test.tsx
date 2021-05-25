import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import LayoutPopups from './LayoutPopups'

describe('LayoutPopups', () => {
  it('matches snapshot', () => {
    const utils = render(
      <RecoilRoot>
        <LayoutPopups />
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
