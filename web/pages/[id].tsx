import React, { useEffect, useState } from 'react'
import Styles from '../styles/blogDetail/index.module.scss'
import moment from 'moment'
import marked from 'marked'
import { message } from 'antd'
import { IBlogList, headerType } from '../types/response'
import { getBlogDetail, getIndexPageData, goodLikeBlog, blog_createComment } from '../api/api'
import PageHeader from '../components/Header'
interface IProps {
    blogDetail: IBlogList
}

const BlogDetail: React.FC<IProps> = (props) => {

    let section = null

    const [likeTody, setLikeTody] = useState<boolean>(false)

    const [scrollWidth, setScollWidth] = useState<string>('0%')

    const [commentName, setCommentName] = useState<string>('')

    const [commentEmail, setCommentEmail] = useState<string>('')

    const [context, setContext] = useState<string>('')

    const { blogDetail } = props

    useEffect(() => {

        section = document.getElementById('section')

        goodLikeBlog({ id: blogDetail.id, like: false })

        disposeLikeTody()

        window.addEventListener('scroll', scrollBar, false)

        return () => window.addEventListener('scroll', scrollBar, false)
    }, [])

    const scrollBar = () => {

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
            return message.warn('你已经点过赞了')
        }

        currentLike.push({ id, todyLike: true })

        setLikeTody(true)

        localStorage.setItem('currentLike', JSON.stringify(currentLike))

        goodLikeBlog({ id: blogDetail.id, like: true })

        message.success('good.')
    }

    const submitComment = () => {

    }

    const inputContext = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        if (name == 'name') {
            setCommentName(value)
        } else if (name == 'email') {
            setCommentEmail(value)
        } else if (name == 'context') {
            setContext(value)
        }
    }


    const renderComment = () =>
    (<div className={Styles.comment_user}>
        <div className={Styles.comment_user_list}>
            <div className={Styles.describe}>
                <div className={Styles.describe_left}>
                    <img src="/image/4.jpg" alt="" />
                </div>
                <div className={Styles.describe_right}>
                    <span>
                        我是你爹
                    </span>
                    <span>
                        2020-2-29
                    </span>
                </div>
            </div>
            <div className={Styles.content}>
                hello 我是你爹
            </div>
        </div>
        <div className={Styles.comment_user_list}>
            <div className={Styles.describe}>
                <div className={Styles.describe_left}>
                    <img src="/image/4.jpg" alt="" />
                </div>
                <div className={Styles.describe_right}>
                    <span>
                        我是你爹
                    </span>
                    <span>
                        2020-2-29
                    </span>
                </div>
            </div>
            <div className={Styles.content}>
                hello 我是你爹
            </div>
        </div>
    </div>)



    return <div>

        <div className={Styles.scrollbar} style={{ width: scrollWidth }}></div>

        <PageHeader logo={true} title={blogDetail.title} likeTody={likeTody} onOk={onOk} blogId={blogDetail.id} type={headerType.blog_detail} />

        <section className={Styles.section} id="section">
            {renderContent()}
        </section>

        <div className={Styles.comment}>
            <section className={Styles.comment_section}>

                <div className={Styles.comment_form}>

                    <div className={Styles.commentInput}>
                        <input type="text" placeholder="Name" name='name' onChange={inputContext} />
                        <input type="text" placeholder="Email" name='email' onChange={inputContext} />
                    </div>
                    <textarea placeholder="说点什么呢..." name="context" onChange={inputContext}></textarea>

                    <div className={Styles.subBtn}>
                        <button onClick={submitComment}>
                            SUBMIT
                        <div className={Styles.mark}>请选择邮箱噢</div>
                        </button>
                        <div className={Styles.charts}>~认真和用心是一种态度, 感谢支持~</div>

                    </div>
                </div>

                <h2 className={Styles.comment_title}><span>Comment List</span><span>(7)</span></h2>
                {renderComment()}
            </section>

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