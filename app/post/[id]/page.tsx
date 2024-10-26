import { connectDB } from '@/db/database'
import { MongoClient, ObjectId } from 'mongodb'
// import Comment from './Comment'
import Content from './Content'
import styles from './page.module.scss'

export default async function Page(props: { params: { id: string } }) {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) })

  return (
    <div className={styles.post_container}>
      <p className={styles.post_title}>{result?.title}</p>
      <Content result={result} />
      {/* <Comment id={props.params.id} /> */}
      <form method="GET" action={'/api/post'}>
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
