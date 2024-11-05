import { MongoClient } from 'mongodb'

import { connectDB } from '@/db/database'
import { postType } from '@/types/types'
import MainBanner from '@/containers/MainBanner'
import Studies from '@/containers/Studies'

import Header from '@/components/Header'

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
    // <div className={styles.list_container}>
    <>
      <Header />
      <MainBanner />
      <Studies />
    </>
    // </div>
  )
}

export default Home

// {/* {data?.map((item) => (
//       <Link
//         className={styles.list_box}
//         href={`/post/${item._id}`}
//         key={item._id}
//       >
//         <div className={styles.content_box}>
//           <h3>{item.title}</h3>
//           <p>{item.date}</p>
//           <p>{item.author}</p>
//         </div>
//       </Link>
//     ))} */}
