import BoxPopup from "components/Popup/BoxPopup/BoxPopup"
import { useRecoilValue } from "recoil"
import { popupState } from "states/popup"

const LayoutPopups = () => {
  const popup = useRecoilValue(popupState)
  console.log("popup : ", popup.openedPopups)

  return (
    <div>
      <p>{popup.openedPopups.join(", ")}</p>
      <BoxPopup popupTitle="signUp">
        <div>
          <p>이게 제대로 뜨는지 보자</p>
        </div>
      </BoxPopup>
    </div>
  )
}

export default LayoutPopups
