import styles from './Header.module.scss'
import Link from 'next/link'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href='/'>
            <a>Traffickr</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href='/#about'>
                <a>서비스 소개</a>
              </Link>
            </li>
            <li>
              <Link href='/signin'>
                <a>로그인</a>
              </Link>
            </li>
            <li className={styles.square_button}>
              <Link href='/signup'>
                <a>시작하기</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
