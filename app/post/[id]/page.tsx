import { MongoClient, ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'

import { connectDB } from '@/db/database'
import { categories } from '@/constants/category'

// import Comment from './Comment'
import Content from '../../../containers/detail/Content'
import styles from './page.module.scss'

const Page = async (props: { params: { id: string } }) => {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props?.params.id) })

  if (!result) {
    notFound()
  }

  return (
    <div className={`${styles.post_bg}`}>
      <div className={styles.post_wrapper}>
        <main className={styles.post_content}>
          <Content result={result} />
        </main>
      </div>
    </div>
  )
}

export default Page
