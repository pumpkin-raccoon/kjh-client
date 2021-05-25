import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Popup from './Popup'

describe('Popup', () => {
  it('matches snapshot', () => {
    const utils = render(
      <RecoilRoot>
        <Popup popupTitle="">
          <div></div>
        </Popup>
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
