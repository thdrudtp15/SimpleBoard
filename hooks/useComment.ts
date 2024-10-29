import { useEffect, useState } from 'react'

import { commentType } from '@/types/types'

export function useComment(id: string, comment: { comment: string }) {
  const [commentList, setCommentList] = useState<commentType[]>([])

  /**
   * 댓글 리스트 가져오기
   */
  const getCommentList = async () => {
    const res = await fetch(`/api/comment?id=${id}`, {
      method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json()
      setCommentList(data.data)
    }
  }

  /**
   * 댓글 작성하기
   */
  const writeComment = async () => {
    const res = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ parent_id: id, comment: comment.comment }),
    })

    const data = await res.json()
    console.log(data)

    if (data.status === 200) {
      getCommentList()
    } else {
      throw new Error(data.error)
    }
  }

  useEffect(() => {
    getCommentList()
  }, [])

  return { commentList, writeComment }
}
