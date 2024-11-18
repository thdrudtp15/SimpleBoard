import dynamic from 'next/dynamic'

const Editor = dynamic(() => import(`@/containers/write/Editor`), {
  ssr: false,
})

const Page = () => {
  return <Editor />
}

export default Page
