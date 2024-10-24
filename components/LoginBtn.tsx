'use client'

import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import styles from './LoginBtn.module.scss'

export default function LoginBtn({ session }: { session: Session | null }) {
  if (session) {
    return (
      <button className={styles.login_button} onClick={() => signOut()}>
        로그아웃
      </button>
    )
  } else {
    return (
      <button className={styles.login_button} onClick={() => signIn()}>
        로그인
      </button>
    )
  }
}
