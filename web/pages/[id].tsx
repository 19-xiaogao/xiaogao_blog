import React, { useState } from 'react'
import { getBlogDetail, getIndexPageData } from '../api'
import { IBlogList } from '../types/response'
import { message } from 'antd'
import { CaretRightOutlined, PauseOutlined, WechatOutlined, HeartFilled } from '@ant-design/icons'
import Styles from '../styles/blogDetail/index.module.scss'
interface IProps {
    blogDetail: IBlogList
}
const BlogDetail: React.FC<IProps> = (props) => {
    const [play, setPlay] = useState<boolean>(false)
    const renderHeader = () => (<header className={Styles.header}>
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
    </header>)

    return <div>
        {renderHeader()}
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