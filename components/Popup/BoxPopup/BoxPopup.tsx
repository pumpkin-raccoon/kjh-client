import { useRecoilState } from "recoil"
import { popupState, PopupTitle } from "states/popup"
import Popup, { PopupProps } from "../Popup"
import styles from "./BoxPopup.module.scss"

interface BoxPopupProps extends PopupProps {
  className?: string
}

const BoxPopup = (props: BoxPopupProps) => {
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

  return (
    <Popup popupTitle={popupTitle}>
      <div className={`${styles.box_popup} ${className}`}>
        <button onClick={() => closePopup()} className={styles.close_button}>
          <p>X</p>
        </button>
        {children}
      </div>
    </Popup>
  )
}

export default BoxPopup
