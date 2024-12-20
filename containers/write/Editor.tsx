'use client'

import hljs from 'highlight.js'
import ReactQuill from 'react-quill'
import { ToastContainer } from 'react-toastify'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.min.css'

import { getPresignedImg } from '@/utils/getPresignedImg'
import { error, success } from '@/utils/toast'
import { categories } from '@/constants/category'

import styles from './Editor.module.scss'
import 'react-quill/dist/quill.snow.css'
import '../../app/quill.css'
import 'highlight.js/styles/atom-one-dark.min.css' // Highlight.js 스타일
import ContentContainer from '@/components/ContentContainer'

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

const categoryName = Object.keys(categories).map((item: string) => item)

const Editor = () => {
  hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
  })

  const [content, setContent] = useState<string>('')
  const [category, setCategory] = useState<string>(categoryName[0])
  const [tags, setTags] = useState<string[]>([])

  const quillRef = useRef<ReactQuill | null>(null)
  const titleRef = useRef<string | null>('')
  const router = useRouter()

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
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
    if (!titleRef.current) {
      error('타이틀을 입력해주세요')
      return
    }

    if (!content) {
      error('아무 내용도 입력하지 않았습니다')
      return
    }

    const _res = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleRef.current,
        content,
        category,
        tags,
      }),
    })
    if (_res.status === 200) {
      router.push('/')
    } else {
      error(_res.statusText)
    }
  }

  return (
    // <div className={styles.editor_container}>
    <ContentContainer>
      <input
        type="text"
        placeholder="게시글의 제목을 작성해주세요"
        className={styles.editor_input__title}
        onChange={(e) => {
          titleRef.current = e.target.value
        }}
      />
      <div className={styles.editor_select}>
        {categoryName.map((item: string) => (
          <button
            className={`${styles.editor_select_btn} ${
              category === item && styles.select
            }`}
            type="button"
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.editor_badge}>
        <input
          className={styles.editor_badge_input}
          placeholder="서브 카테고리 입력"
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              const copy = [...tags]
              if (e.target.value) {
                copy.push(`#${e.target.value}`)
                setTags(copy)
                e.target.value = ''
              }
            }
          }}
          type="text"
          maxLength={10}
        />
        <div className={styles.editor_badge_list}>
          {tags &&
            tags.map((item) => (
              <button
                type="button"
                className={styles.editor_badge_items}
                key={item}
                onClick={() => {
                  let copy = [...tags]
                  copy = copy.filter((tag: string) => tag !== item)
                  setTags(copy)
                }}
              >
                {item}
              </button>
            ))}
        </div>
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
      <ToastContainer />
      <button type="button" onClick={write}>
        작성
      </button>
    </ContentContainer>
    // </div>
  )
}

export default Editor
