import dynamic from 'next/dynamic'

const Editor = dynamic(() => import(`@/components/lib/Editor`), { ssr: false })

export default function Page() {
  return <Editor />
}
