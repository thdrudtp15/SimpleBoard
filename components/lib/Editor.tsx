'use client'

import styles from './Editor.module.scss'
import ReactQuill from 'react-quill'
import { useState } from 'react'
import Input from '../common/Input'

const modules = {
  toolbar: [
    ['blockquote', 'code-block'],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['link'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean'], // remove formatting button
  ],
  // 순서를 잘 구성해서 작성할 것
}
const formats = [
  'font',
  'code-block',
  'size',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

export default function Editor() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [publicOption, setPublicOption] = useState<boolean>(false)

  const write = async () => {
    const _res = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        publicOption,
      }),
    })
    if (_res.status === 500) {
      alert('에러 발생')
    }
  }

  return (
    <div>
      <label>
        제목
        <Input style="text" value={title} onChange={setTitle} />
      </label>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="글 작성해주세요"
        className={styles.editor}
        formats={formats}
      />
      <label>
        비공개
        <input
          type="checkbox"
          checked={publicOption}
          onChange={() => setPublicOption((prev) => !prev)}
        />
      </label>
      <button onClick={write}>글쓰기</button>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}
