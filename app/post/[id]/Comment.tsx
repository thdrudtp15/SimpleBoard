'use client'

import { useComment } from '@/hooks/useComment'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function Comment() {
  const [comment, setComment] = useState('')
  const params = useParams()
  const { commentList } = useComment(params?.id as string)

  return (
    <div>
      <input type="text" onChange={(e) => setComment(e.target.value)}></input>
      <button>댓글 작성</button>
      <div>
        {commentList?.map((item, index) => (
          <div key={index}>댓글들</div>
        ))}
      </div>
    </div>
  )
}
