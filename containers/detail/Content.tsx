'use client'

import React, { useEffect, useRef } from 'react'
import styles from './Content.module.scss'
import '../../app/ReactQuill.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-jsx.js'

const Content = ({ result, codestyle }: { result: any; codestyle: string }) => {
  useEffect(() => {
    const preTag = document.querySelectorAll('pre')
    if (preTag instanceof NodeList) {
      preTag.forEach((tag, _index) => {
        const tagsInner = tag.innerHTML
        tag.innerHTML = ''
        const codeTag = document.createElement('code')
        codeTag.classList.add(`language-${codestyle}`)
        codeTag.innerHTML = tagsInner
        tag.appendChild(codeTag)
      })
      Prism.highlightAll()
    }

    const titles = document.querySelectorAll('h1, h2')
    const ulTag = document.querySelector('#quick')

    if (titles && titles instanceof NodeList) {
      titles.forEach((tag) => {
        let { tagName, innerHTML } = tag
        let linkTag = document.createElement('a')
        linkTag.innerHTML = innerHTML
        linkTag.href = `#${innerHTML}`
        tag.id = `${innerHTML}`
        if (tagName === 'H1') {
          linkTag.classList.add(styles.H1)
        } else if (tagName === 'H2') {
          linkTag.classList.add(styles.H2)
        }
        ulTag?.appendChild(linkTag)
      })
    }
  }, [])

  // 지금 이렇게 하는데,
  // 작성할 때 작성하는 방법은 없는지 찾아보자.

  return (
    <>
      <ul className={styles.quick} id="quick">
        {/* <li></li> */}
        {/**
         * 동적으로 li태그가 할당 됨.
         */}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: result.content }} />
    </>
  )
}
export default Content
