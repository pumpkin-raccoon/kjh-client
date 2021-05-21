import { validate } from "public/utils/validate"

describe("utils validate", () => {
  it("validate email correctly when it's wrong", () => {
    const validationResult = validate("email", "abc.com")
    expect(validationResult.isValid).toEqual(false)
  })

  it("validate email correctly when it's correct", () => {
    const validationResult = validate("email", "abc@abc.com")
    expect(validationResult.isValid).toEqual(true)
  })
})
