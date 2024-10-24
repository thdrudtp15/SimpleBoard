import styles from './ListItem.module.scss'
import { postType } from '@/types/types'
import Link from 'next/link'
import Image from 'next/image'
import defaultCodeImage from '../assets/imges/defaultImage_code.webp'

export default function ListItem({ data }: { data: postType[] }) {
  console.log(data)

  return (
    <div className={styles.list_container}>
      {data?.map((item) => (
        <Link
          className={styles.list_box}
          href={`/post/${item._id}`}
          key={item._id}
        >
          <div className={styles.image_box}>
            <Image
              className={styles.image}
              src={defaultCodeImage}
              alt="default"
            ></Image>
          </div>
          <div className={styles.content_box}>
            <h3>{item.title}</h3>
            <p>{item.date.toLocaleDateString()}</p>
            <p>{item.author}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
