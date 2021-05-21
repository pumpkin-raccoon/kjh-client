import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import SignUpPopup from "./SignUpPopup"

describe("SignUpPopup", () => {
  it("matches snapshot", () => {
    const utils = render(
      <RecoilRoot>
        <SignUpPopup />
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
