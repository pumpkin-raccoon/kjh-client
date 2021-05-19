import React, { MouseEvent } from "react"
import { useRecoilState } from "recoil"
import { popupState, PopupTitle } from "states/popup"
import styles from "./Popup.module.scss"

export interface PopupProps {
  className?: string
  children: React.ReactNode
  popupTitle: PopupTitle
}

const Popup = (props: PopupProps) => {
  const {
    className = "", //
    children,
    popupTitle,
  } = props

  const [popup, setPopup] = useRecoilState(popupState)

  const closePopup = () => {
    const targetOpenedPopups = popup.openedPopups.filter((title: PopupTitle) => {
      return title !== popupTitle
    })
    setPopup({
      ...popup,
      ...{
        openedPopups: targetOpenedPopups,
      },
    })
  }

  const clickBackground = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    closePopup()
  }

  if (popup.openedPopups.includes(popupTitle)) {
    return (
      <div className={`${styles.popup} ${className}`} onClick={clickBackground}>
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </div>
    )
  }
  return <></>
}

export default Popup
