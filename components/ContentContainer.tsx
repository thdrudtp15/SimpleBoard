import { ReactNode } from 'react'

import styles from './ContentContainer.module.scss'

const ContentContainer = ({ children }: { children: ReactNode }) => {
  return <section className={styles.content__container}>{children}</section>
}

export default ContentContainer
