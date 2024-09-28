import { useEffect, useState } from 'react'

export function useComment(id: string) {
  const [commentList, setCommentList] = useState([1, 2, 3])

  const getCommentList = async () => {
    const res = await fetch(`/api/comment?id=${id}`, {
      method: 'GET',
    })
    if (res.status === 200) {
      let data = await res.json()
      setCommentList(data.data)
    } else {
      alert('댓글 조회 중 오류 발생')
    }
  }

  useEffect(() => {
    getCommentList()
  }, [])

  return { commentList }
}
