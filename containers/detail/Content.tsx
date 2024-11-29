'use client'

import React, { useLayoutEffect } from 'react'

import styles from './Content.module.scss'
import 'highlight.js/styles/atom-one-dark.min.css' // Highlight.js 스타일
import 'react-quill/dist/quill.snow.css'

const Content = ({ result }: { result: any }) => {
  return (
    <>
      <aside id="quick-wrap" className={styles.quick_link__wrap}>
        <ul id="quick" className={styles.quick_link__list} />
      </aside>
      <div className="ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: result.content }}
        />
      </div>
    </>
  )
}
export default Content
