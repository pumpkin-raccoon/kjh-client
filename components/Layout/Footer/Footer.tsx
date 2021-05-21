import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <p className={styles.copyright}>Copyright 2021 traffickr. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
