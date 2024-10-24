import styles from './Header.module.scss'

import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa'
import { getServerSession, Session } from 'next-auth'
import LoginBtn from './LoginBtn'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Link from 'next/link'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className={styles.header}>
      <div className={styles.link_box}>
        <Link href={'/'}>로고</Link>
        <Link href={'/write'}>글쓰기</Link>
        <Link href={'/suggestions'}>문의</Link>
      </div>
      <div className={styles.profile_box}>
        {session && (
          <>
            <Image
              className={styles.profile_img}
              width={30}
              height={30}
              src={session?.user?.image as string}
              alt="11"
            />
          </>
        )}
        <p className={styles.profile_name}>{session?.user?.name}</p>
        <LoginBtn session={session} />
      </div>
    </header>
  )
}
