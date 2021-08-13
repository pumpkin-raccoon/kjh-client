import { useRecoilState } from 'recoil'
import { popupState } from 'states/popup'
import styles from './HomeContainerHeader.module.scss'

const HomeContainerHeader = () => {
  const [ popup, setPopup ] = useRecoilState(popupState)
  return (
    <div className={ styles.HomeContainerHeader }>
      <div className={ styles.text }>
        <h2 className={ styles.title }>
          피드백을 통해<br/>
          성장해 보세요.
        </h2>
        <p className={ styles.description }>
          솔직한 피드백을 통해 방향성을 확인해 보세요.
        </p>
      </div>

      <button
        className={ styles.button }
        onClick={ () => setPopup({ ...popup, ...{ openedPopups: [ 'signUp' ] } }) }
      >
        지금 시작하기
      </button>

      <img 
        className={ styles.traffic_image }
        alt='traffic light icon'
        src='/images/home/traffic.png'
      />
    </div>
  )
}

export default HomeContainerHeader
