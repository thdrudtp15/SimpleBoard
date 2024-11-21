import { getServerSession } from 'next-auth'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import LoginBtn from './LoginBtn'
import styles from './Footer.module.scss'

const Footer = async () => {
  const session = await getServerSession(authOptions)

  return (
    <footer className={styles.footer}>
      <div className={styles.profile_box}>
        <LoginBtn session={session} />
      </div>
    </footer>
  )
}

export default Footer
