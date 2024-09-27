'use client'

import styles from './ListItem.module.scss'
import { postType } from '@/types/types'
import Link from 'next/link'

export default function ListItem({ data }: { data: postType[] }) {
  return (
    <div className={styles.list_container}>
      {data?.map((item, index) => (
        <Link
          className={styles.list_box}
          href={`/post/${item._id}`}
          key={item._id}
          onClick={() => {}}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}
