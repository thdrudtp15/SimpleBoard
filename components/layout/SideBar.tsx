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
    { title: 'DASHBOARD', image: <FaHome size={24} />, link: '/' },
    { title: 'WRITE', image: <FaPen size={24} />, link: '/writing' },
    { title: 'LIST', image: <FaListOl size={24} />, link: '/list' },
    {
      title: 'SETTING',
      image: <MdSettingsSuggest size={24} />,
      link: '/suggestions',
    },
  ]

  return (
    <aside className={styles.aside}>
      <h3 className={styles.title}>LOGO & TITLE</h3>
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
    </aside>
  )
}
