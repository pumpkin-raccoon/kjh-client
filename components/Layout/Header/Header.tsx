import styles from "./Header.module.scss"
import Link from "next/link"
import { useRecoilState } from "recoil"
import { popupState } from "states/popup"
import { currentUserState } from "states/currentUser"
import { getDefaultUser } from "models/User"

const Header = () => {
  const [popup, setPopup] = useRecoilState(popupState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href="/">
            <a>traffickr</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          {currentUser.isLoggedIn ? (
            <ul>
              <li>
                <button
                  onClick={() =>
                    setCurrentUser({
                      ...currentUser,
                      ...{ isLoggedIn: false, currentUser: getDefaultUser() },
                    })
                  }
                >
                  <p>로그아웃</p>
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link href="/#about">
                  <a>서비스 소개</a>
                </Link>
              </li>
              <li>
                <button onClick={() => setPopup({ ...popup, ...{ openedPopups: ["signIn"] } })}>
                  <p>로그인</p>
                </button>
              </li>
              <li>
                <button
                  className={styles.round_link}
                  onClick={() => setPopup({ ...popup, ...{ openedPopups: ["signUp"] } })}
                >
                  <p>지금 시작하기</p>
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
