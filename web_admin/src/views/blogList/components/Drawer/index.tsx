import React from 'react'
import marked from 'marked'
import { Drawer } from 'antd';

interface DrawerBlogProps {
    visible: boolean
    context: string
    title: string
    onClose: () => void
}

const DrawerBlog: React.FC<DrawerBlogProps> = (props) => {
    const { title, visible, onClose, context } = props
    const HtmlData: string = marked(context, { gfm: true, xhtml: false })
    return <Drawer title={title} placement="right" closable={false} onClose={onClose} visible={visible} width={450}>
        <div dangerouslySetInnerHTML={{ __html: HtmlData }}></div>
    </Drawer>
}
export default DrawerBlog
