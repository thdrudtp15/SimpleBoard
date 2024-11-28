'use client'

import React, { useLayoutEffect } from 'react'
import Prism from 'prismjs'

import styles from './Content.module.scss'

import '../../app/ReactQuill.css'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-tsx.js'

const Content = ({ result, codestyle }: { result: any; codestyle: string }) => {
  useLayoutEffect(() => {
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
    const asideTag = document.querySelector('#quick-wrap')

    if (titles.length > 0 && titles instanceof NodeList) {
      titles.forEach((tag) => {
        const { tagName, innerHTML } = tag
        const linkTag = document.createElement('a')
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
      asideTag?.classList.add(styles.displayed)
    }
  }, [codestyle])

  // 지금 이렇게 하는데,
  // 작성할 때 작성하는 방법은 없는지 찾아보자.
  // 리랜더링 작업 수행 시 코드 하이라이트가 풀린다..!
  // 이거 해결 좀..ㅋ

  // 이미지 클릭 시 모달 및
  // 텍스트 스타일링 완성하기

  return (
    <>
      <aside id="quick-wrap" className={styles.quick_link__wrap}>
        <ul id="quick" className={styles.quick_link__list} />
      </aside>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: result.content }}
      />
    </>
  )
}
export default Content
