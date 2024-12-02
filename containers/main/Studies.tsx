import { MongoClient } from 'mongodb'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'
import { categories, categoryKeys } from '@/constants/category'

import List from '../../components/List'
import styles from './Studies.module.scss'

const Studies = async () => {
  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('post').find({ activate: true }).toArray()
  const studies: postType[] = result.map(
    (item) =>
      ({
        ...item,
        _id: item._id.toString(),
        date: item.date.toLocaleDateString(),
      } as postType),
  )

  const data: { [key in categoryKeys]?: postType[] } = {}
  Object.keys(categories).forEach((key: string) => {
    data[key as categoryKeys] = studies.filter(
      (study) => study.category === key,
    )
  })

  // 맵은 배열을 반환
  // forEach는 반환이 필요없는 순회 작업에 더 적합함

  return <List data={data} />
}

export default Studies
