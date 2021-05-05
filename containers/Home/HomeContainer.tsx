import styles from './HomeContainer.module.scss'

const HomeContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.banner_image}>
          <img
            src='/images/home/traffic-light.png'
            alt='traffic-light in banner'
          />
        </div>
        
        <div className={styles.banner_contents}>
          <h2 className={styles.banner_title}>
            Continue, Stop, New
          </h2>
          <p className={styles.banner_description}>
            주변 사람들이 해 주는 신뢰도 100% 설문 서비스
          </p>
          <button className={styles.banner_button}>
            <p>
              지금 시작하기
            </p>
          </button>
        </div>
      </div>
      <h2 className={styles.title}>
        Hi, this is traffickr
      </h2>
    </div>
  )
}

export default HomeContainer
