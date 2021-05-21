import { render } from "@testing-library/react"
import TextInput from "./TextInput"

describe("TextInput", () => {
  it("matches snapshot", () => {
    const utils = render(<TextInput value={"test"} setValue={() => {}} />)
    expect(utils.container).toMatchSnapshot()
  })
})
