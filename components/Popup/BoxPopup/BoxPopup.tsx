import { useRecoilState } from "recoil"
import { popupState, PopupTitle } from "states/popup"
import Popup, { PopupProps } from "../Popup"
import styles from "./BoxPopup.module.scss"

const BoxPopup = (props: PopupProps) => {
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
    <Popup popupTitle={popupTitle} className={className}>
      <div className={`${styles.box_popup}`}>
        <button onClick={() => closePopup()} className={styles.close_button}>
          <img alt="close" src="/images/icons/close-button.png" />
        </button>
        {children}
      </div>
    </Popup>
  )
}

export default BoxPopup
