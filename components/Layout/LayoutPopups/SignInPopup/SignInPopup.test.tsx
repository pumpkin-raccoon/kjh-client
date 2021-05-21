import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import SignInPopup from "./SignInPopup"

describe("SignInPopup", () => {
  it("matches snapshot", () => {
    const utils = render(
      <RecoilRoot>
        <SignInPopup />
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
