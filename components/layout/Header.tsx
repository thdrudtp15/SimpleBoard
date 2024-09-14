'use client'
import styles from './Header.module.scss'

import { usePathname } from 'next/navigation'

export default function Header() {
  const path = usePathname()?.replace('/', '')
  return <header className={styles.header}>{path}</header>
}
