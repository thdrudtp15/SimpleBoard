'use client'

import styles from './Editor.module.scss'
import './ReactQuill.css'
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
    <div className={styles.editor_container}>
      <div className={`${styles.editor_section} ${styles.section_write}`}>
        <div className={styles.editor_input__title}>
          <label>
            <Input style="write_title" value={title} onChange={setTitle} />
          </label>
        </div>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="글 작성해주세요"
          className={styles.editor}
          formats={formats}
        />
      </div>
      <div className={`${styles.editor_section} ${styles.section_prv}`}>
        <h1>{title}</h1>
        <br></br>
        <br></br>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  )
}

{
  /* <label>
비공개
<input
  type="checkbox"
  checked={publicOption}
  onChange={() => setPublicOption((prev) => !prev)}
/>
</label>
<button onClick={write}>글쓰기</button> */
}
