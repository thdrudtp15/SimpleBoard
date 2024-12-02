import MainBanner from '@/containers/main/MainBanner'
import Studies from '@/containers/main/Studies'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Home = async () => {
  return (
    <>
      <MainBanner />
      <Studies />
    </>
  )
}

export default Home
