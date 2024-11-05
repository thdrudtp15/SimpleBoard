'use client'

import '../app/ReactQuill.css'
import ReactQuill from 'react-quill'
import { ToastContainer } from 'react-toastify'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.min.css'

import { getPresignedImg } from '@/utils/getPresignedImg'
import { error, success } from '@/utils/toast'

import styles from './Editor.module.scss'
import 'react-quill/dist/quill.snow.css'
import Input from './Input'

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

const Editor = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [publicOption, setPublicOption] = useState<boolean>(false) // 공개 옵션

  const quillRef = useRef<ReactQuill | null>(null)
  const router = useRouter()

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
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ['image'],
        ],
        handlers: {
          image() {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.addEventListener('change', async (event) => {
              const target = event.target as HTMLInputElement
              if (target.files && target.files[0]) {
                if (quillRef.current) {
                  const editor = quillRef.current?.getEditor()
                  const range = editor?.getSelection()
                  const fileurl = await getPresignedImg(target.files[0])

                  if (fileurl && typeof range?.index === 'number') {
                    const [_data, length] = editor.getLine(
                      range.index as number,
                    )
                    if (length !== 0) {
                      editor.insertText(range.index, '\n')
                    }
                    editor.insertEmbed(range.index, 'image', fileurl)
                    editor.setSelection((range.index + 2) as any)
                  } else {
                    error('이미지 업로드 중 에러 발생')
                    return null
                  }
                }
              }
              return null
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
    if (_res.status === 200) {
      router.push('/')
    } else {
      error(_res.statusText)
    }
  }

  return (
    <div className={styles.editor_container}>
      <ToastContainer />
      <div className={styles.editor_input__title}>
        <Input styleSet="write_title" value={title} onChange={setTitle} />
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
      <button type="button" onClick={write}>
        작성
      </button>
    </div>
  )
}

/* <label>
비공개
<input
  type="checkbox"
  checked={publicOption}
  onChange={() => setPublicOption((prev) => !prev)}
/>
</label>
<button onClick={write}>글쓰기</button> */

export default Editor
