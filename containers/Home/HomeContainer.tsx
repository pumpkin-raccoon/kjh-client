import Link from 'next/link'
import styles from './HomeContainer.module.scss'

const HomeContainer = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.banner }>
        <div className={ styles.banner_contents }>
          <h2 className={ styles.banner_title }>
            Find the right
            <br />
            way for you.
          </h2>
          <p className={ styles.banner_description }>a personal, peer evaluation service.</p>
          <div className={ styles.banner_buttons }>
            <Link href={ '/signup' }>
              <button className={ styles.banner_round_button }>
                <p>지금 시작하기</p>
              </button>
            </Link>
            <Link href={ '/#' }>
              <button className={ styles.banner_normal_button }>
                <p>더 알아보기</p>
              </button>
            </Link>
          </div>
        </div>

        <div className={ styles.banner_image }>
          <img src="/images/home/traffic-light.png" alt="traffic-light in banner" />
        </div>
      </div>
      <h2 className={ styles.title }>Hi, this is traffickr</h2>
    </div>
  )
}

export default HomeContainer
