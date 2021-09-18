import { useState } from 'react'
import styles from './Dropdown.module.scss'
import Popover from 'components/Popover/Popover'

interface DropdownProps<T> {
  className?: string
  closeAfterClick?: boolean
  targetItems: T[]
  renderKey: keyof T
  currentItem?: T
  selectItem: (item: T) => void
  currentValue?: string
  isTriggerDisabled?: boolean
}

const Dropdown = <T extends any> (props: DropdownProps<T>) => {
  const [ isContentOpened, setIsContentOpened ] = useState(false)
  const {
    className = '',
    closeAfterClick,
    targetItems,
    renderKey,
    selectItem,
    currentItem,
    currentValue,
    isTriggerDisabled
  } = props

  return (
    <Popover
      isTriggerDisabled={ isTriggerDisabled }
      className={ `${styles.Dropdown} ${className}` }
      closeAfterClick={ closeAfterClick }
      changeToClosed={ () => setIsContentOpened(false) }
      changeToOpened={ () => setIsContentOpened(true) }
      triggerClassName={ styles.trigger }
      trigger={
        <button disabled={ isTriggerDisabled }>
          <p>{currentValue || currentItem?.[renderKey] || '선택'}</p>
          <img 
            alt="toggle icon"
            src='/images/icons/dropdown-arrow.svg'
            className={ isContentOpened ? styles.reversed : '' }
          />
        </button>
      }
      contentClassName={ styles.content }
      content={
        <div className={ styles.box }>
          {targetItems.map((item: T, index: number) => (
            <button
              className={ styles.item }
              key={ index }
              onClick={ () => selectItem(item) }
            >
              <p>{item[renderKey]}</p>
            </button>
          ))}
        </div>
      }
    />
  )
}

export default Dropdown
