import { connectDB } from '@/db/database'
import { MongoClient, ObjectId } from 'mongodb'
import Comment from './Comment'
import Content from './Content'
import styles from './page.module.scss'

export default async function Page(props: { params: { id: string } }) {
  console.log(props.params.id)

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) })

  return (
    <div className={styles.post_container}>
      <h1>{result?.title}</h1>
      <Content result={result} />
      {/* <Comment id={props.params.id} /> */}
    </div>
  )
}
