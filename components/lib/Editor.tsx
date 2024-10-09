'use client'

import styles from './Editor.module.scss'
import './ReactQuill.css'
import ReactQuill from 'react-quill'
import { useMemo, useRef, useState } from 'react'
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
  const quillRef = useRef<ReactQuill | null>(null)

  const modules = useMemo(() => {
    return {
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
                if (quillRef.current) {
                  const editor = quillRef.current?.getEditor()
                  const range = editor?.getSelection()
                  alert(range?.index)
                  console.log(src)
                  if (range?.index) {
                    editor.insertEmbed(
                      range.index,
                      'image',
                      'data:image/jpeg;base64,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',
                    )
                    editor.setSelection((range.index + 3) as any)
                  }
                }
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
  }, [])

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
