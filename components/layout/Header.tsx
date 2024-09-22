'use client'

import styles from './Header.module.scss'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa'
import { Session } from 'next-auth'

export default function Header({ session }: { session: Session | null }) {
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
      {!session && <button onClick={() => signIn()}>로그인</button>}
      {session && <button onClick={() => signOut()}>로그아웃</button>}
    </header>
  )
}
