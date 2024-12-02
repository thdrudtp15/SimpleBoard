import Link from 'next/link'

import styles from './Header.module.scss'

const Header = async () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link href="/" style={{ fontWeight: 'bold' }}>
          LOGOS
        </Link>
        <Link href="/write">WRITE</Link>
      </nav>
    </header>
  )
}

export default Header
