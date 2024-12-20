// post 타입 정의
export type postType = {
  _id: string
  title: string
  activate: boolean
  content: string
  date: string
  category: string
  tags: string[]
}

export type commentType = {
  _id: string
  parent_id: string
  comment: string
  date: Date
  ref?: number
  author: string
  author_image: string
}
