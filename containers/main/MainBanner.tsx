import styles from './MainBanner.module.scss'

const MainBanner = () => {
  return (
    <section className={styles.main_banner__container}>
      <header className={styles.main_banner__text}>
        <p className={styles.main_banner__text_static}>My Studies</p>
        <p className={styles.main_banner__text_dynamic}>What is it?</p>
      </header>
    </section>
  )
}

export default MainBanner
