// import Image from 'next/image'
// import styles from './page.module.css'
import { connectDB } from '@/db/database'
import { MongoClient } from 'mongodb'

export default async function Home() {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result: unknown = await db.collection('post').find().toArray()
  console.log(result)

  return <div></div>
}
