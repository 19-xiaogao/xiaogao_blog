import React from 'react'
import Header from '../components/Header'
import Styles from '../styles/Article/index.module.scss'
import { getAllBlog } from '../api/index'
import { GetStaticProps } from 'next'
import { IBlogList, headerType } from '../types/response'
interface IArticle {
    blogALl: IBlogList[]
}
// 文章列表
const Article: React.FC<IArticle> = (props) => {

    return <div className={Styles.page}>
        <Header type={headerType.blog_detail} />
        <section className={Styles.home}>
            <div className={Styles.year_list}>
                <ul className={Styles.month_list}>
                    <li className={Styles.month}>Feb, 2021</li>
                    <ul className={Styles.day}>
                        <li className={Styles.day_detail}>
                            <img src="/image/4.jpg" alt="" />
                            <div className={Styles.char}>
                                <h3>新年快乐、致将欲行的一年！</h3>
                                <span>14 LIKE / 234 READ</span>
                            </div>
                            <span className={Styles.item_r}>16th</span>
                        </li>
                    </ul>
                </ul>
            </div>
        </section>
    </div>
}
export default Article

export const getStaticProps: GetStaticProps = async () => {
    const { data, success } = await getAllBlog()
    if (!success) return
    return {
        props: {
            blogAll: data
        }
    }
}