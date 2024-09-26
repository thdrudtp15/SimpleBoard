import { connectDB } from '@/db/database'
import { MongoClient, ObjectId, WithId } from 'mongodb'

import { postType } from '@/types/types'
import dynamic from 'next/dynamic'
const ListItem = dynamic(() => import('../../components/list/ListItem'))

export default async function Page() {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('post').find().toArray()
  const data: postType[] = result.map((item) => ({
    ...item,
    _id: new ObjectId(item._id).toString(),
  }))

  return (
    <div>
      <ListItem data={data} />
    </div>
  )
}
