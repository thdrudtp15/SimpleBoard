import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { MongoClient, ObjectId } from 'mongodb'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'

import styles from './page.module.scss'
import defaultCodeImage from '../assets/imges/defaultImage_code.webp'

const Home = async () => {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('post').find().toArray()
  const data: postType[] = result.map(
    (item) =>
      ({
        ...item,
        _id: item._id.toString(),
        date: item.date.toLocaleDateString(),
      } as postType),
  )

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
            />
          </div>
          <div className={styles.content_box}>
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            <p>{item.author}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
