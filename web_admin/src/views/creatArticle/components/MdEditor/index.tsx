import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css';

interface IMarkDownProps {
    context: string
    onchange: ({ html, text }: { html: string, text: string }) => void
}

const MarkDowns: React.FC<IMarkDownProps> = (props) => {
    const mdParser = new MarkdownIt()
    const { context, onchange } = props
    return <MdEditor
        style={{ height: '100%', width: '100%' }}
        value={context}
        renderHTML={(text) => mdParser.render(text)}
        onChange={onchange}
    />
}
export default MarkDowns