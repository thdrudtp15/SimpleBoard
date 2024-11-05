import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import styles from './Header.module.scss'
import LoginBtn from './LoginBtn'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link href="/" style={{ fontWeight: 'bold' }}>
          LOGOS
        </Link>
        {/* <Link href="/write">글쓰기</Link> */}
      </div>
      {/* <div className={styles.profile_box}>
        <p className={styles.profile_name}>{session?.user?.name}</p>
        <LoginBtn session={session} />
      </div> */}
    </header>
  )
}

export default Header
