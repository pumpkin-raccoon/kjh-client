import styles from './Header.module.scss'
import Link from 'next/link'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { popupState } from 'states/popup'
import { currentUserState, isUserLoggedInState } from 'states/currentUser'
import { getDefaultUser } from 'models/User'
import { COOKIE_NAME, removeCookie } from 'utils/cookie'
import { useRouter } from 'next/dist/client/router'

const Header = () => {
  const router = useRouter()
  const [ popup, setPopup ] = useRecoilState(popupState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState)

  return (
    <header className={ styles.header }>
      <div className={ styles.contents }>
        <div className={ styles.logo_container }>
          <Link href={ isUserLoggedIn ? '/dashboard' : '/' }>
            <a>traffickr</a>
          </Link>
        </div>

        <nav className={ styles.navigation }>
          {isUserLoggedIn ? (
            <ul>
              <li>
                <button
                  onClick={ () => {
                    removeCookie(COOKIE_NAME.token)
                    setCurrentUser(getDefaultUser())
                    router.push('/')
                  } }
                >
                  <p>로그아웃</p>
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button onClick={ () => setPopup({ ...popup, ...{ openedPopups: [ 'signIn' ] } }) }>
                  <p>로그인</p>
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
