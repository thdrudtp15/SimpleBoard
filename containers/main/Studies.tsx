import { MongoClient } from 'mongodb'
import Link from 'next/link'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'
import { categories } from '@/constants/category'

import styles from './Studies.module.scss'

const Studies = async () => {
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

  type CategoryKeys = 'HTML' | 'CSS' | 'JAVA SCRIPT' | 'REACT'

  const data: { [key in CategoryKeys]?: postType[] } = {}
  Object.keys(categories).forEach((key: string) => {
    data[key as CategoryKeys] = studies.filter(
      (study) => study.category === key,
    )
  })

  // 맵은 배열을 반환
  // forEach는 반환이 필요없는 순회 작업에 더 적합함

  return (
    <section className={styles.studies__container}>
      <main className={styles.studies__inner}>
        <div className={styles.studies__list_header}>
          <section>{4} Categories</section>
          <section>{studies.length} Studies</section>
        </div>
        {Object.entries(categories).map(([key]) => (
          <article key={key} className={styles.studies__list_category}>
            <section className={styles.studies__category}>
              <h3>{key}</h3>
            </section>
            <section className={styles.studies__content_box}>
              <ul>
                {data[key as CategoryKeys]?.map(
                  (study: postType, index: number) => (
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
                  ),
                )}
              </ul>
            </section>
          </article>
        ))}
      </main>
    </section>
  )
}

export default Studies
