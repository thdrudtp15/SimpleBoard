'use client'

import Link from 'next/link'
import styles from './SideBar.module.scss'

import { FaHome } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaListOl } from 'react-icons/fa'
import { ReactElement } from 'react'
import { MdSettingsSuggest } from 'react-icons/md'

import { usePathname } from 'next/navigation'

export default function SideBar() {
  const path = usePathname()

  const tabArray: { title: string; image?: ReactElement; link: string }[] = [
    { title: '메인', image: <FaHome />, link: '/' },
    { title: '글 쓰기', image: <FaPen />, link: '/writing' },
    { title: '글 리스트', image: <FaListOl />, link: '/list' },
  ]

  return (
    <aside className={styles.aside}>
      <div className={styles.aside_top}>
        <h3 className={styles.title}>Simple Board</h3>
        <ul className={styles.content_container}>
          {tabArray?.map((item) => (
            <Link
              className={`${styles.content_tab} ${
                item.link === path && styles.content_tab__select
              }`}
              href={item.link}
              key={item.title}
            >
              {item.image}
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
      <ul className={styles.aside_bottom}>
        <Link
          href={'/suggestions'}
          className={`${styles.content_tab__deactive}`}
        >
          <MdSettingsSuggest /> 건의사항
        </Link>
      </ul>
    </aside>
  )
}
