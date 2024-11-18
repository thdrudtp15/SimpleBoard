'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

import { commentType } from '@/types/types'
import { useComment } from '@/hooks/useComment'

const initComment = {
  comment: '',
}

const Comment = ({ id }: { id: string }) => {
  const [comment, setComment] = useState(initComment)

  const params = useParams()

  const { commentList, writeComment } = useComment(
    params?.id as string,
    comment,
  )

  /**
   * 댓글
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const obj = {
      [e.target.name]: e.target.value,
    }
    setComment(obj as { comment: string })
  }

  /**
   * 댓글 작성 서버요청
   */
  const onWrite = async () => {
    try {
      await writeComment()
      setComment(initComment)
    } catch (e) {
      alert('!')
    }
  }

  return (
    <div>
      <input
        type="text"
        name="comment"
        required
        value={comment.comment}
        onChange={(e) => onChange(e)}
      />
      <button type="button" onClick={onWrite} disabled={!comment.comment}>
        댓글 작성
      </button>
      <div>
        {commentList?.map((item, _index) => (
          <div key={item?._id}>{item?.comment}</div>
        ))}
      </div>
    </div>
  )
}

export default Comment
