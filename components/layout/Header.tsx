import styles from './Header.module.scss'

import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa'
import { getServerSession, Session } from 'next-auth'
import LoginBtn from './LoginBtn'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className={styles.header}>
      <div className={styles.profile_box}>
        {session && (
          <>
            <FaRegBell size={25} />
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
      </div>
      <LoginBtn session={session} />
    </header>
  )
}
