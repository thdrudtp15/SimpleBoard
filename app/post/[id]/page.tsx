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

  type CategoryKeys = 'HTML' | 'CSS' | 'JAVA SCRIPT' | 'REACT'

  const codestyle = categories[result?.category as CategoryKeys]?.codestyle
  // 오브젝트[키] 방식을 사용하려면 리터럴 타입으로 지정을 해줘야 한다ㅋ

  return (
    <div className={`${styles.post_bg} ${styles[codestyle]}`}>
      {/* <h1 className={styles.post_category}>{result.category}</h1>
      <h2 className={styles.post_title}>{result?.title}</h2> */}
      <div className={styles.post_wrapper}>
        <header className={styles.post_header}>?</header>
        <main className={styles.post_content}>
          <Content result={result} codestyle={codestyle} />
          {/* <Comment id={props.params.id} /> */}
          {/* <form method="GET" action="/api/post">
        <input
          type="hidden"
          value={result ? result._id.toString() : undefined}
          name="id"
        />
        <button type="submit" className="delete">
          삭제
        </button>
      </form> */}
        </main>
      </div>
    </div>
  )
}

export default Page
