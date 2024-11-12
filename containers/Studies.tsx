import { MongoClient } from 'mongodb'
import Link from 'next/link'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'

import styles from './Studies.module.scss'

const Studies = async () => {
  const categories = ['HTML', 'CSS', 'JAVA SCRIPT', 'REACT']

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('post').find({ activate: true }).toArray()
  const studies: postType[] = result.map(
    (item) =>
      ({
        ...item,
        _id: item._id.toString(),
        date: item.date.toLocaleDateString(),
      } as postType),
  )

  return (
    <section className={styles.studies__container}>
      <main className={styles.studies__inner}>
        <div className={styles.studies__list_header}>
          <section>{categories.length} Categories</section>
          <section>{studies.length} Studies</section>
        </div>
        {categories.map((category) => (
          <article key={category} className={styles.studies__list_category}>
            <section className={styles.studies__category}>
              <h3>{category}</h3>
            </section>
            <section className={styles.studies__content_box}>
              <ul>
                {studies?.map((study, index) => (
                  <li key={study._id.toString()}>
                    <Link
                      className={styles.studies__content_list}
                      href={`/post/${study._id}`}
                    >
                      <p className={styles.studies__content_number}>
                        {index + 1}
                      </p>
                      <p className={styles.studies__content_title}>
                        {study.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </main>
    </section>
  )
}

export default Studies
