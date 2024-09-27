'use client'

import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

export default function LoginBtn({ session }: { session: Session | null }) {
  if (session) {
    return <button onClick={() => signOut()}>로그아웃</button>
  } else {
    return <button onClick={() => signIn()}>로그인</button>
  }
}
