'use client'

import { useEffect } from 'react'
import './Content.scss'
import '../../ReactQuill.css'

export default function Content({ result }: { result: any }) {
  useEffect(() => {
    if (!result) {
      return
    }
    const preTag = document.querySelectorAll('pre')
    if (preTag instanceof NodeList) {
      preTag.forEach((tag, index) => {
        // const split = tag.innerHTML.split(';')
        const split = ['const name = 송경세', 'let age = 50']
        split.forEach((item, index) => {
          if (item !== '') {
            let codeTag = document.createElement('code')
            codeTag.style.display = 'block'
            // codeTag.innerHTML = hljs.highlightAuto(item).value
            tag.appendChild(codeTag)
          }
        })
      })
    }
  }, [result])

  return <div dangerouslySetInnerHTML={{ __html: result.content }}></div>
}
