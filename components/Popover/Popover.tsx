import * as React from 'react'
import styles from './Popover.module.scss'

const Popover = (props: {
  content: React.ReactNode
  trigger: React.ReactNode
  className?: string
  closeAfterClick?: boolean
  onClickTrigger?: Function
  onClickContent?: Function
  triggerClassName?: string
  contentClassName?: string
  isTriggerDisabled?: boolean
  changeToOpened?: Function
  changeToClosed?: Function
}) => {
  const {
    content,
    trigger,
    className = '',
    closeAfterClick,
    onClickTrigger,
    onClickContent,
    triggerClassName = '',
    contentClassName = '',
    isTriggerDisabled,
    changeToOpened,
    changeToClosed
  } = props
  const [ isContentOpened, setIsContentOpened ] = React.useState<boolean>(false)

  const handleTriggerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTriggerDisabled) {
      return
    }
    event.stopPropagation()
    if (onClickTrigger) {
      onClickTrigger()
    }
    if (isContentOpened) {
      closeContent()
      return
    }
    setIsContentOpened(true)
    if (changeToOpened) {
      changeToOpened()
    }
    document.addEventListener('click', closeContent)
  }

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (onClickContent) {
      onClickContent()
    }
    if (closeAfterClick) {
      closeContent()
    }
  }

  const closeContent = () => {
    document.removeEventListener('click', closeContent)
    setIsContentOpened(false)
    if (changeToClosed) {
      changeToClosed()
    }
  }

  return (
    <div className={ `${styles.Popover} ${className}` }>
      <div 
        className={ triggerClassName }
        onClick={ handleTriggerClick }
      >
        { trigger }
      </div>
      
      {isContentOpened &&
        <div 
          className={ contentClassName }
          onClick={ handleContentClick }
        >
          { content }
        </div>
      }
    </div>
  )
}

export default Popover
