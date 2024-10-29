import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import styles from './Header.module.scss'
import LoginBtn from './LoginBtn'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className={styles.header}>
      <div className={styles.link_box}>
        <Link href="/" style={{ fontWeight: 'bold' }}>
          Blogs
        </Link>
        <Link href="/write">글쓰기</Link>
      </div>
      <div className={styles.profile_box}>
        {/* {session && (
          <Image
            className={styles.profile_img}
            width={30}
            height={30}
            src={session?.user?.image as string}
            alt="11"
          />
        )} */}
        <p className={styles.profile_name}>{session?.user?.name}</p>
        <LoginBtn session={session} />
      </div>
    </header>
  )
}

export default Header
