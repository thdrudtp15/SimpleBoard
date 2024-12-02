import styles from './Content.module.scss'
import 'highlight.js/styles/atom-one-dark.min.css' // Highlight.js 스타일
import 'react-quill/dist/quill.snow.css'
import '../../app/quill.css'
import ContentContainer from '@/components/ContentContainer'

const Content = ({ result }: { result: any }) => {
  return (
    <ContentContainer>
      <div className={`ql-snow ${styles.content}`}>
        <div
          className="ql-editor"
          style={{
            padding: 0,
          }}
          dangerouslySetInnerHTML={{ __html: result.content }}
        />
      </div>
    </ContentContainer>
  )
}
export default Content
