'use client'

import styles from './Editor.module.scss'
import './ReactQuill.css'
import ReactQuill from 'react-quill'
import { useRef, useState } from 'react'
import Input from '../common/Input'

const modules = {
  toolbar: {
    container: [
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['link'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['image'],
      ['clean'], // remove formatting button
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.addEventListener('change', (event) => {
          const target = event.target as HTMLInputElement
          if (target.files && target.files[0]) {
            console.log(target.files[0])
            let src = URL.createObjectURL(target.files[0])
          }
        })
        input.click()

        // 1. 클릭을 함
        // 2. 이미지를 마운트 함.
        // 3. 이미지 마운트 한 걸 S3에 업로드 함
        // 4. 주소를 받아와서
        // 5. 현재 커서 위치에 <img sr~/> 이렇게 넣음
      },
    },
  },
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
  const quillRef = useRef(null)

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
          ref={quillRef}
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
