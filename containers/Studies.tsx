import styles from './Studies.module.scss'

const Studies = () => {
  const category = ['HTML', 'CSS', 'JAVA SCRIPT', 'REACT']
  const studies = [1, 23, 123, 12, 31, 2, 43, 42, 34, 235]

  return (
    <section className={styles.studies__container}>
      <main className={styles.studies__inner}>
        <div className={styles.studies__list_header}>
          <section>{category.length} Categories</section>
          <section>{studies.length} Studies</section>
        </div>
        {category.map((item) => (
          <article key={item} className={styles.studies__list_category}>
            <section className={styles.studies__category}>
              <h3>{item}</h3>
            </section>
            <section className={styles.studies__content_box}>{}</section>
          </article>
        ))}
      </main>
    </section>
  )
}

export default Studies
