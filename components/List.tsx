'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { postType } from '@/types/types'
import { categoryKeys } from '@/constants/category'

import styles from './List.module.scss'

const List = ({ data }: { data?: { [key in categoryKeys]?: postType[] } }) => {
  const [selectedCategory, setSelectedCategory] = useState<categoryKeys>('HTML')
  const [dataList, setDataList] = useState<postType[] | null>(null)

  useEffect(() => {
    if (data && data[selectedCategory]) {
      setDataList(data[selectedCategory])
    }
  }, [data, selectedCategory])

  return (
    <div className={styles.list__container}>
      <nav className={styles.list__nav}>
        {Object.keys(data as postType).map((item) => (
          <button
            type="button"
            key={item}
            className={styles.list__btn}
            onClick={() => setSelectedCategory(item as categoryKeys)}
          >
            {item}
          </button>
        ))}
      </nav>
      <main>
        {dataList?.map((item) => (
          <Link href={`/post/${item._id}`} key={item._id}>
            <article>
              <h1>{item.title}</h1>
            </article>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default List
