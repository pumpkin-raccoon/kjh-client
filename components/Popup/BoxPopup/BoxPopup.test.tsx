import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import BoxPopup from "./BoxPopup"

describe("BoxPopup", () => {
  it("matches snapshot", () => {
    const utils = render(
      <RecoilRoot>
        <BoxPopup popupTitle="">
          <div></div>
        </BoxPopup>
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
