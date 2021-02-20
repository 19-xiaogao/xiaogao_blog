import React, { useState } from 'react'
import Styles from '../styles/blogDetail/index.module.scss'
import moment from 'moment'
import marked from 'marked'
import { message } from 'antd'
import { IBlogList } from '../types/response'
import { getBlogDetail, getIndexPageData } from '../api'
import { CaretRightOutlined, PauseOutlined, WechatOutlined, HeartFilled } from '@ant-design/icons'
interface IProps {
    blogDetail: IBlogList
}
const BlogDetail: React.FC<IProps> = (props) => {
    const [play, setPlay] = useState<boolean>(false)
    const { blogDetail } = props

    const renderHeader = () => (
        <>
            <div className={Styles.logo}>
                <i className="web-font" >小 · 膏</i>
                {!play ? <CaretRightOutlined onClick={() => setPlay(true)} /> : <PauseOutlined onClick={() => setPlay(false)} />}
            </div>
            <div className={Styles.menuIcon}>
                <WechatOutlined />
                <HeartFilled />
                <span className={Styles.img}>
                    <img src="/image/4.jpg" alt="" />
                </span>
            </div>
        </>
    )
    const renderContent = () => (<>
        <h1>{blogDetail.title}</h1>
        <div className={Styles.stuff}>
            <span>{moment(blogDetail.createDate).format('YYYY-MM-DD')}</span>
            <span>阅读&nbsp;{blogDetail.viewCount}</span>
            <span>字数&nbsp;{blogDetail.number_words}</span>
            <span>评论&nbsp;1920</span>
            <span>喜欢&nbsp;{blogDetail.likeCount}</span>
        </div>
        <div className={Styles.content}>
            <div className={Styles.blogDetail} dangerouslySetInnerHTML={{ __html: marked(blogDetail.content, { gfm: true, xhtml: false }) as string }}>
            </div>
        </div>
    </>)
    const renderComment = () => (<section className={Styles.comment_section}>
        <div className={Styles.comment_form}>
            <div className={Styles.commentInput}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
            </div>
            <textarea placeholder="说点什么呢..."></textarea>
            <div className={Styles.subBtn}>
                <button>SUBMIT</button>
                <div>~认真和用心是一种态度, 感谢支持~</div>
            </div>
        </div>
        <h2 className={Styles.comment_title}><span>Comment List</span><span>(7)</span></h2>
    </section>)
    return <div>
        <header className={Styles.header}>
            {renderHeader()}
        </header>
        <section className={Styles.section}>
            {renderContent()}
        </section>
        <div className={Styles.comment}>
            {renderComment()}
        </div>
    </div>
}



export async function getStaticPaths() {
    const { data, success } = await getIndexPageData()
    if (!success) return message.warn('请求错误-getStaticPaths')
    const paths = data.list.map(item => ({
        params: { id: String(item.id) }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { success, data } = await getBlogDetail({ id: params.id })
    if (!success) return message.warn('请求错误---getStaticProps')
    return {
        props: {
            blogDetail: data[0]
        }
    }
}


export default BlogDetail