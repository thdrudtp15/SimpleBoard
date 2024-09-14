import styles from './Header.module.scss'

import Image from 'next/image'
import { FaRegBell } from 'react-icons/fa'
import Path from './Path'

export default function Header() {
  return (
    <header className={styles.header}>
      <Path />
      {/* <button className="">로그인</button> */}
      <div className={styles.profile_box}>
        <FaRegBell size={25} />
        <Image
          className={styles.profile_img}
          width={30}
          height={30}
          src="data:image/jpeg;base64,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"
          alt="11"
        />
        <p className={styles.profile_name}>Jony Walter</p>
      </div>
    </header>
  )
}
