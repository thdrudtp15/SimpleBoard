'use client'

import { postType } from '@/types/types'
import DOMPurify from 'dompurify'
import styles from './ListItem.module.scss'
import { useRouter } from 'next/navigation'

export default function ListItem({ data }: { data: postType[] }) {
  const route = useRouter()

  return (
    <div className={styles.list_container}>
      {data?.map((item, index) => (
        <div className={styles.list_box} key={item._id} onClick={() => {}}>
          {item.title}
        </div>
      ))}
    </div>
  )
}
