'use client'

import styles from './Header.module.scss'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa'
import { Session } from 'next-auth'
import css from 'styled-jsx/css'
import styled from 'styled-components'

type style_flexType = {
  items: string
  justify: string
  direction: string
}

const flex = ({ items, justify, direction }: style_flexType) => css`
  display: flex;
  align-items: ${items};
  justify-content: ${justify};
  flex-direction: ${direction};
`

const StyledHeader = styled.header<style_flexType>`
  ${(props) => flex(props)}
  width: 100%;
  height: 60px;
  background-color: var(--background);
`

export default function Header({ session }: { session: Session | null }) {
  return (
    <StyledHeader items="center" justify="flex-end" direction="row">
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
    </StyledHeader>
  )
}
