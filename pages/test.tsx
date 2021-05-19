import { ChangeEvent } from "react"
import { atom, selector, useRecoilState, useRecoilValue } from "recoil"

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
})

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState)

    return text.length
  },
})

const TestPage = () => {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const count = useRecoilValue(charCountState)

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        DEMO
      </h2>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <br />
      Character Count: {count}
    </div>
  )
}

export default TestPage
