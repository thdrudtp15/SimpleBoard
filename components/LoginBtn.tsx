'use client'

import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

import styles from './LoginBtn.module.scss'

const LoginBtn = ({ session }: { session: Session | null }) => {
  if (session) {
    return (
      <button
        type="button"
        className={styles.login_button}
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    )
  }
  return (
    <button
      type="button"
      className={styles.login_button}
      onClick={() => signIn()}
    >
      로그인
    </button>
  )
}

export default LoginBtn
