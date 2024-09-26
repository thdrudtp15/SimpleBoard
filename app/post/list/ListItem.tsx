'use client'

import { postType } from '@/types/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--flex-gap-small);
`
const Box = styled(Link)`
  padding: 20px;
  width: 100%;
  background: #ccc;
  border-radius: 8px;
  cursor: pointer;
`

export default function ListItem({ data }: { data: postType[] }) {
  return (
    <Container>
      {data?.map((item, index) => (
        <Box href={`/post/${item._id}`} key={item._id} onClick={() => {}}>
          {item.title}
        </Box>
      ))}
    </Container>
  )
}
