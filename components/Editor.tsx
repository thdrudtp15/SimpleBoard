'use client'

import styles from './Editor.module.scss'
import ReactQuill from 'react-quill'
import { useEffect, useMemo, useRef, useState } from 'react'
import Input from './Input'
import { getPresignedImg } from '@/utils/getPresignedImg'

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
  const [publicOption, setPublicOption] = useState<boolean>(false) // 공개 옵션
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
        ],
        handlers: {
          image: function () {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.addEventListener('change', async (event) => {
              const target = event.target as HTMLInputElement
              if (target.files && target.files[0]) {
                console.log(target.files[0])
                if (quillRef.current) {
                  const editor = quillRef.current?.getEditor()
                  const range = editor?.getSelection()
                  const fileurl = await getPresignedImg(target.files[0])
                  if (typeof range?.index === 'number') {
                    const [data, length] = editor.getLine(range.index as number)
                    if (length !== 0) {
                      editor.insertText(range.index, '\n')
                    }
                    editor.insertEmbed(range.index, 'image', fileurl)
                    editor.setSelection((range.index + 2) as any)
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
            // 6. 추가적으로 배열에 이미지 경로를 넣어서 첫 번째 이미지가 배너 디자인으로 나타나게 하면 될 거 같다.

            // 사이즈 조정 필요할까?
            // 이미지 지울 때 AWS 삭제 요청?
            // 게시글 편집 기능 어케..?
            // 파일 구조도 손 봐야 함.
            // 컴포넌트는 원뎁스로
            // 진짜 디자인 쓰레기..;
            // 다른 사이트 카피
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
        <button onClick={write}>작성</button>
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
