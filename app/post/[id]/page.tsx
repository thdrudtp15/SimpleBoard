import { connectDB } from '@/db/database'
import { MongoClient, ObjectId } from 'mongodb'
import Comment from './Comment'

export default async function Page(props: { params: { id: string } }) {
  console.log(props.params.id)

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) })

  return (
    <div>
      <h1>{result?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: result?.content }}></div>
      <Comment />
    </div>
  )
}
