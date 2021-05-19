import React from "react"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import styles from "./Layout.module.scss"
import LayoutPopups from "./LayoutPopups/LayoutPopups"

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{props.children}</main>
      <LayoutPopups />

      <Footer />
    </div>
  )
}

export default Layout
