import Link from 'next/link'

import styles from './Header.module.scss'

const Header = async () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link href="/" style={{ fontWeight: 'bold' }}>
          LOGOS
        </Link>
        <Link href="/write">WRITE</Link>
      </div>
    </header>
  )
}

export default Header
