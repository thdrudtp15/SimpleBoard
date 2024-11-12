import { MongoClient, ObjectId } from 'mongodb'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'

// import Comment from './Comment'
import Content from './Content'
import styles from './page.module.scss'

const Page = async (props: { params: { id: string } }) => {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props?.params.id) })

  // let data
  // if (result) {
  //   data = {
  //     ...result,
  //     _id: result._id.toString(),
  //     date: result.date.toLocaleDateString(),
  //   } as postType
  // }

  return (
    <div className={styles.post_container}>
      <p className={styles.post_title}>{result?.title}</p>
      <Content result={result} />
      {/* <Comment id={props.params.id} /> */}
      <form method="GET" action="/api/post">
        <input
          type="hidden"
          value={result ? result._id.toString() : undefined}
          name="id"
        />
        <button type="submit" className="delete">
          삭제
        </button>
      </form>
    </div>
  )
}

export default Page
