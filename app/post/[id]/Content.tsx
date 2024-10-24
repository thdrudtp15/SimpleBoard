'use client'

import { useEffect } from 'react'
import './Content.scss'
import '../../ReactQuill.css'
import React from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // 스타일 가져오기
import 'prismjs/components/prism-javascript.js' // 자바스크립트 언어 모드 추가
import 'prismjs/components/prism-css.js' // 필요한 다른 언어 모드 추가
import 'prismjs/components/prism-jsx.js' // JSX도 필요하다면 추가

function langFilter() {
  return 'language-javascript'
}

export default function Content({ result }: { result: any }) {
  useEffect(() => {
    console.log('!')
    if (!result) {
      return
    }
    const preTag = document.querySelectorAll('pre')
    if (preTag instanceof NodeList) {
      preTag.forEach((tag, index) => {
        const tagsInner = tag.innerHTML
        tag.innerHTML = ''
        const codeTag = document.createElement('code')
        codeTag.classList.add('language-javascript')
        codeTag.innerHTML = tagsInner
        tag.appendChild(codeTag)
      })
      Prism.highlightAll()
    }
  }, [result])

  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: result.content }}></div>
    </React.Fragment>
  )
}
