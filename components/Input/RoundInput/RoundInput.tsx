import React from 'react'
import styles from './RoundInput.module.scss'

const RoundInput = (props: {
  className?: string
  value: string | number
  setValue: (value: string | number) => void
  placeholder?: string | number
  focusColor?: 'default' | 'red'
  labelText?: string
}) => {
  const {
    className,
    value,
    setValue,
    placeholder,
    focusColor = 'default',
    labelText
  } = props
  
  return (
    <div className={ `
      ${ styles.RoundInput } 
      ${ className }
      ${ labelText ? styles.with_label : ''}
      ${ styles[`focus_color_${focusColor}`] }
    ` }>
      {labelText &&
        <label htmlFor={ `${labelText}_input` }>
          <p>{labelText}</p>
        </label>
      }
      <input 
        id={ labelText ? `${labelText}_input` : undefined }
        value={ value }
        onChange={ (event) => setValue(event.target.value) }
        placeholder={ placeholder?.toString() }
      />
    </div>
  )
}

export default RoundInput
