import React, { useEffect, useState } from 'react'
import Styles from '../styles/blogDetail/index.module.scss'
import moment from 'moment'
import marked from 'marked'
import { message } from 'antd'
import { IBlogList, headerType } from '../types/response'
import { getBlogDetail, getIndexPageData, goodLikeBlog } from '../api'
import PageHeader from '../components/Header'
interface IProps {
    blogDetail: IBlogList
}

const BlogDetail: React.FC<IProps> = (props) => {
    const [likeTody, setLikeTody] = useState<boolean>(false)
    const [scrollWidth, setScollWidth] = useState<string>('0%')
    const { blogDetail } = props
    useEffect(() => {
        goodLikeBlog({ id: blogDetail.id, like: false })
        disposeLikeTody()
        const section = document.getElementById('section')
        window.addEventListener('scroll', () => scrollBar(section), false)

        return () => window.addEventListener('scroll', () => scrollBar(section), false)
    }, [])

    const scrollBar = (section: any) => {
        const absolutely = (window.scrollY / section.scrollHeight) * 100
        setScollWidth(absolutely.toFixed(2) + '%')
    }

    const disposeLikeTody = () => {
        if (!localStorage.getItem('currentLike')) {
            localStorage.setItem('currentLike', JSON.stringify([]))
            setLikeTody(false)
        } else {
            const currentLike = JSON.parse(localStorage.getItem('currentLike'))
            if (currentLike.find(item => item.id === props.blogDetail.id)) {
                setLikeTody(true)
            }
        }
    }

    const renderContent = () => (<>
        <h1>{blogDetail.title}</h1>
        <div className={Styles.stuff}>
            <span>{moment(blogDetail.createDate).format('YYYY-MM-DD')}</span>
            <span>阅读&nbsp;{blogDetail.viewCount}</span>
            <span>字符&nbsp;{blogDetail.number_words}</span>
            <span>评论&nbsp;1920</span>
            <span>喜欢&nbsp;{blogDetail.likeCount}</span>
        </div>
        <div className={Styles.content}>
            <div className={Styles.blogDetail} dangerouslySetInnerHTML={{ __html: marked(blogDetail.content, { gfm: true, xhtml: false }) as string }}>
            </div>
        </div>
    </>)
    const onOk = () => {
        const { id } = props.blogDetail
        const currentLike = JSON.parse(localStorage.getItem('currentLike'));
        if (currentLike.find(item => item.id === id)) {
            setLikeTody(true)
            return message.warn('你今天已经点过赞了')
        }
        currentLike.push({ id, todyLike: true })
        setLikeTody(true)
        localStorage.setItem('currentLike', JSON.stringify(currentLike))
        goodLikeBlog({ id: blogDetail.id, like: true })
        message.success('谢谢您的赞赏。')
    }
    const renderComment = () => (<section className={Styles.comment_section}>
        <div className={Styles.comment_form}>
            <div className={Styles.commentInput}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
            </div>
            <textarea placeholder="说点什么呢..."></textarea>
            <div className={Styles.subBtn}>
                <button>
                    SUBMIT
                <div className={Styles.mark}>请选择邮箱噢</div>
                </button>
                <div className={Styles.charts}>~认真和用心是一种态度, 感谢支持~</div>

            </div>
        </div>
        <h2 className={Styles.comment_title}><span>Comment List</span><span>(7)</span></h2>
    </section>)
    return <div>
        <div className={Styles.scrollbar} style={{ width: scrollWidth }}></div>
        <PageHeader logo={true} title={blogDetail.title} likeTody={likeTody} onOk={onOk} blogId={blogDetail.id} type={headerType.blog_detail} />
        <section className={Styles.section} id="section">
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