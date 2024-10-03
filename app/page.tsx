import { connectDB } from '@/db/database'
import { MongoClient, ObjectId } from 'mongodb'

import { postType } from '@/types/types'
import dynamic from 'next/dynamic'
const ListItem = dynamic(() => import('./ListItem'))

export default async function Home() {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('post').find().toArray()
  const data: postType[] = result.map(
    (item) =>
      ({
        ...item,
        _id: item._id.toString(),
      } as postType),
  )

  return (
    <div>
      <ListItem data={data} />
    </div>
  )
}
