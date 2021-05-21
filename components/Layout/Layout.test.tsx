import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Layout from "./Layout"

describe("Layout", () => {
  it("matches snapshot", () => {
    const utils = render(
      <RecoilRoot>
        <Layout>
          <div></div>
        </Layout>
      </RecoilRoot>,
    )
    expect(utils.container).toMatchSnapshot()
  })
})
