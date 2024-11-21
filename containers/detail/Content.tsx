'use client'

import React, { useEffect } from 'react'
import './Content.scss'
import '../../app/ReactQuill.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-jsx.js'
import DOMPurify from 'dompurify'

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
  }, [])

  // const sanitizeContent = DOMPurify?.sanitize(result.content)

  return <div dangerouslySetInnerHTML={{ __html: result.content }} />
}
export default Content
