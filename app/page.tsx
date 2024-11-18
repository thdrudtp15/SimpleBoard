import MainBanner from '@/containers/main/MainBanner'
import Studies from '@/containers/main/Studies'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Home = async () => {
  return (
    // <div className={styles.list_container}>
    <>
      <Header />
      <MainBanner />
      <Studies />
      <Footer />
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
