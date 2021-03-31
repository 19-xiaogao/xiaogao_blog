import React, { useEffect, useState } from 'react'
import Styles from '../styles/blogDetail/index.module.scss'
import moment from 'moment'
import marked from 'marked'
import { message } from 'antd'
import PageHeader from '../components/Header'
import PuzzleVerify from '../components/puzzleVerify'

import { getBlogDetail, getIndexPageData, goodLikeBlog, blog_createComment, get_blogComment } from '../api/api'
import LoadingDom from '../components/loading'

import { IBlogList, headerType, IComment } from '../types/response'
import { Email } from '../util/RegExp'

interface IProps {
    blogDetail: IBlogList

}



const BlogDetail: React.FC<IProps> = (props) => {

    let section = null

    const [comment, setComment] = useState<IComment[]>([])
    const [total, setTotal] = useState<number>(0)
    const [likeTody, setLikeTody] = useState<boolean>(false)

    const [scrollWidth, setScrollWidth] = useState<string>('0%')

    const [commentName, setCommentName] = useState<string>('')

    const [commentEmail, setCommentEmail] = useState<string>('')

    const [context, setContext] = useState<string>('')

    const [errorInfo, setErrorInfo] = useState<string>('~认真和用心是一种态度, 感谢支持~')

    const [openValidation, setValidation] = useState<boolean>(false)

    const [pageSize, setPageSize] = useState<number>(5)

    const [loadingMore, SetLoading] = useState<boolean>(false)

    const { blogDetail } = props



    useEffect(() => {

        section = document.getElementById('section')

        goodLikeBlog({ id: blogDetail.id, like: false })

        disposeLikeTody()

        window.addEventListener('scroll', scrollBar, false)

        return () => window.removeEventListener('scroll', scrollBar, false)
    }, [])

    // 获取评论数据
    useEffect(() => {
        (async () => {
            const { success, data } = await get_blogComment({ id: props.blogDetail.id, pageNo: 1, pageSize: pageSize })
            if (!success) return message.warn('请求错误---getStaticProps')
            setComment(data.list)
            setTotal(data.total)
        })()
    }, [])


    const scrollBar = () => {

        const absolutely = (window.scrollY / section.scrollHeight) * 100

        setScrollWidth(absolutely.toFixed(2) + '%')
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
            return message.warn('你已经点过赞了')
        }

        currentLike.push({ id, todyLike: true })

        setLikeTody(true)

        localStorage.setItem('currentLike', JSON.stringify(currentLike))

        goodLikeBlog({ id: blogDetail.id, like: true })

        message.success('good.')
    }

    const submitComment = async () => {

        if (commentName.trim() === '') {
            return setErrorInfo('×请留下你的大名.')
        }

        if (!Email.test(commentEmail.trim())) {
            return setErrorInfo('×请输入正确的邮箱.')
        }

        if (context.trim() === '') {
            return setErrorInfo('×0分作文')
        }

        setValidation(true)
    }

    const inputContext = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        if (name == 'name') {
            setCommentName(value)
        } else if (name == 'email') {
            setCommentEmail(value)
        }
    }

    const textareaInputContext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContext(e.target.value)
    }


    const renderComment = () =>
    (<div className={Styles.comment_user}>
        {comment.map(item => (
            <div className={Styles.comment_user_list} key={item.id}>
                <div className={Styles.describe}>
                    <div className={Styles.describe_left}>
                        <img src="/image/4.jpg" alt="" />
                    </div>
                    <div className={Styles.describe_right}>
                        <span>
                            {item.commentName}
                        </span>
                        <span>
                            {moment(item.createTime).format('HH:MM YYYY-MM-DD')}
                        </span>
                    </div>
                </div>
                <div className={Styles.content}>
                    {item.context}
                </div>
            </div>
        ))}


    </div>)

    const verifyResponse = async (flg: boolean) => {

        if (!flg) return

        setTimeout(() => setValidation(false), 600);

        const { success } = await blog_createComment({
            articleId: props.blogDetail.id,
            commentName,
            commentEmail,
            createTime: moment(new Date()).format('YYYY-MM-DD HH:MM'),
            context
        })
        if (!success) return

        setErrorInfo('~认真和用心是一种态度, 感谢支持~')
        setCommentName('')
        setCommentEmail('')
        setContext('')
        const { success: commentSuccess, data } = await get_blogComment({ id: props.blogDetail.id, pageNo: 1, pageSize: pageSize })
        if (!commentSuccess) return
        setComment(data.list)
        setTotal(data.total)

    }
    const closeVerify = () => {

        setValidation(false)
    }
    // 加载更多
    const loadMore = async (e) => {
        e.stopPropagation()
        SetLoading(true)
        const { success, data } = await get_blogComment({ id: props.blogDetail.id, pageNo: 1, pageSize: pageSize + 5 })
        setPageSize(pageSize + 5)
        if (!success) return message.warn('请求错误')
        SetLoading(false)
        setComment(data.list)
        setTotal(data.total)
    }

    return <div className={Styles.bigBox}>

        <div className={Styles.scrollbar} style={{ width: scrollWidth }}></div>

        <PageHeader logo={true} title={blogDetail.title} likeTody={likeTody} onOk={onOk} blogId={blogDetail.id} type={headerType.blog_detail} />

        <section className={Styles.section} id="section">
            {renderContent()}
        </section>

        <div className={Styles.comment}>
            <section className={Styles.comment_section}>

                <div className={Styles.comment_form}>

                    <div className={Styles.commentInput}>
                        <input type="text" placeholder="Name" value={commentName} name='name' onChange={inputContext} />
                        <input type="text" placeholder="Email" value={commentEmail} name='email' onChange={inputContext} />
                    </div>
                    <textarea placeholder="说点什么呢..." name="context" value={context} onChange={textareaInputContext}></textarea>

                    <div className={Styles.subBtn}>
                        <button onClick={submitComment}>
                            SUBMIT
                        </button>
                        <div className={Styles.charts} style={errorInfo.length <= 17 ? { color: "red" } : { color: '#909090' }} >{errorInfo}</div>

                    </div>
                </div>

                <h2 className={Styles.comment_title}><span>Comment List</span><span>({total})</span></h2>
                {renderComment()}
                <div className={Styles.more}>
                    {total === comment.length ? <div className={Styles.bottomTest}>到底了</div> : loadingMore ? <LoadingDom /> : <div className={Styles.loadingBtn} onClick={loadMore} >加载更多 </div>}
                </div>
            </section>

        </div>
        {openValidation ? <div className={Styles.mask}>
            <PuzzleVerify verifyResponse={verifyResponse} close={closeVerify} />
        </div> : null}
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
            blogDetail: data[0],
        }
    }
}


export default BlogDetail