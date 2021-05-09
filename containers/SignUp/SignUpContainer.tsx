import styles from './SignUpContainer.module.scss'

const SignUpContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.title}>
          회원가입
        </h1>

        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <h2>이름</h2>
            <input placeholder="홍길동"/>
          </div>
          <div className={styles.inputWrapper}>
            <h2>이메일</h2>
            <input placeholder="example@traffickr.com"/>
          </div>
          <div className={styles.inputWrapper}>
            <h2>비밀번호</h2>
            <input placeholder="비밀번호"/>
          </div>
          <p className={styles.message}>

          </p>
        </div>

        <button
          className={styles.button}
        >
          시작하기
        </button>
      </div>
    </div>
  )
}

export default SignUpContainer
