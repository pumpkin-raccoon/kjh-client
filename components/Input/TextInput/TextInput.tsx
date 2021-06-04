import { ChangeEvent } from 'react'
import styles from './TextInput.module.scss'

const TextInput = (props: {
  className?: string
  labelText?: string
  value: string
  setValue: (newValue: string) => void
  placeholder?: string
}) => {
  const {
    labelText, //
    value,
    setValue,
    placeholder,
    className = '',
  } = props

  return (
    <div className={ `${styles.text_input} ${className}` }>
      {labelText && (
        <label htmlFor={ `${labelText}_input` }>
          {labelText}
        </label>
      )}

      <input
        id={ labelText ? `${labelText}_input` : undefined }
        value={ value }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value)
        } }
        placeholder={ placeholder }
      />
    </div>
  )
}

export default TextInput
