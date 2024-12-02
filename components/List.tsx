'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { postType } from '@/types/types'
import { categoryKeys } from '@/constants/category'

import styles from './List.module.scss'
import ContentContainer from './ContentContainer'

const List = ({ data }: { data?: { [key in categoryKeys]?: postType[] } }) => {
  const [selectedCategory, setSelectedCategory] = useState<categoryKeys>('HTML')
  const [dataList, setDataList] = useState<postType[] | null>(null)

  useEffect(() => {
    if (data && data[selectedCategory]) {
      setDataList(data[selectedCategory])
    }
  }, [data, selectedCategory])

  return (
    <ContentContainer>
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
          <Link
            className={styles.list__item}
            href={`/post/${item._id}`}
            key={item._id}
          >
            <h1 className={styles.list__title}>{item.title}</h1>
            <p className={styles.list__subtitle}>
              VPN 솔루션 선택을 위해 고민한 과정과 고려했던 요소를 공유합니다
              VPN 솔루션 선택을 위해 고민한 과정과 고려했던 요소를 공유합니다VPN
              솔루션 선택을 위해 고민한 과정과 고려했던 요소를 공유합니다
            </p>
            <section className={styles.list__time_ctg}>
              <time className={styles.list__time}>{item.date}</time>
              <div className={styles.list__ctg_wrap}>
                {item.tags &&
                  item.tags.map((tag) => (
                    <div className={styles.list__ctg} key={tag}>
                      {tag}
                    </div>
                  ))}
              </div>
            </section>
          </Link>
        ))}
      </main>
    </ContentContainer>
  )
}

export default List
