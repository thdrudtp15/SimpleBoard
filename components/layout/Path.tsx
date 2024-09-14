'use client'
import { usePathname } from 'next/navigation'

export default function Path() {
  const path = usePathname()?.replace('/', '')

  return (
    <p style={{ textTransform: 'uppercase', fontSize: 24, fontWeight: 'bold' }}>
      {path || 'main'}
    </p>
  )
}
