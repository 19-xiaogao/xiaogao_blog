import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { GetStaticProps } from 'next'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import Styles from '../styles/Article/index.module.scss'
import { blogCategorize } from '../api/api'
import { IBlogList, headerType } from '../types/response'
import { mouthEN } from '../util/mouthEN'
interface IArticleList {
    month: string,
    data: IBlogList[]
}
interface IArticle {
    blogAll: [IArticleList],
    total: number
}
let pageSize = 5;
// 文章列表
const Article: React.FC<IArticle> = (props) => {

    const [blogList, setBlogList] = useState<[IArticleList]>(props.blogAll)

    const [bottomChar, setBottomChar] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        // 判断是否出现滚动条
        const hasScrollbar = () => document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);

        // 计算分类后数据的总长度
        const disposeArrLength = (arr) => arr.reduce((i, j) => i.data.length + j.data.length)

        setBottomChar(hasScrollbar())

        const moveBottom = async (e) => {

            if (props.total === disposeArrLength(blogList)) {
                return setBottomChar(true)
            }
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

            if (scrollTop + windowHeight == scrollHeight) {

                pageSize = pageSize + 5
                const { data, success }: IBlogCategorize = await blogCategorize({ pageNo: 0, pageSize: pageSize })

                if (!success) return

                // 重新定位到最下面
                setBlogList(disposeBlogFiled(data.list))

                if (props.total === data.list.length) {
                    return setBottomChar(true)
                }
            }
        }
        window.addEventListener('scroll', moveBottom, false)
        return () => window.removeEventListener('scroll', moveBottom, false)
    }, [])

    const jumpPage = (id: number) => {
        router.push(`/${id}`)
    }

    const renderMonth = (blog: [IArticleList]) =>

        blog.map((item, index) => (<div className={Styles.year_list} key={index + '1'}>
            
            <ul className={Styles.month_list}>

                <li className={Styles.month}>{item.month}</li>

                <ul className={Styles.day}>
                    {renderListBlog(item.data)}
                </ul>
            </ul>

        </div>))

    const renderListBlog = (blog: IBlogList[]) =>
        blog.map(item => (<li className={Styles.day_detail} key={item.id}>

            <div className={Styles.img}>
                <img src={item.imgUrl} alt="" onClick={() => jumpPage(item.id)} />
            </div>

            <div className={Styles.char}>
                <h3 onClick={() => jumpPage(item.id)}>{item.title}</h3>
                <span>{item.likeCount} LIKE / {item.viewCount} READ</span>
            </div>

            <span className={Styles.item_r}>{item.day}Day</span>
        </li>))


    return <div className={Styles.page}>

        <Header type={headerType.blog_detail} />

        <section className={Styles.home}>

            {renderMonth(blogList)}
            {bottomChar ? <div className={Styles.bottom} >呜呜,已经被掏空了</div> : null}
            
        </section>
    </div>
}
export default Article

const disposeBlogFiled = (list: IBlogList[]): [IArticleList] => {

    const mapAddMouth = list.map(item =>
    ({
        ...item,
        day: moment(item.createDate).format('DD'),
        createDate: moment(item.createDate).format('YYYY-MM-DD'),
        month: moment(item.createDate).format('YYYY-MM')
    }))

    const classify = mapAddMouth.reduce((last, item) => {
        if (last[item.month]) {
            last[item.month].push(item)
        } else {
            last[item.month] = [item]
        }
        return last
    }, {})

    const arr: any = []

    for (const iterator in classify) {
        let fistChar = iterator.split('-')[0];
        let lastChar = Number(iterator.split('-')[1])
        arr.push({ month: mouthEN[lastChar] + ',' + fistChar, data: classify[iterator] })
    }

    return arr
}

interface IBlogCategorize {
    data: {
        total: number
        list: IBlogList[]
    }
    success: boolean
}

export const getStaticProps: GetStaticProps = async () => {

    const { data, success }: IBlogCategorize = await blogCategorize({ pageNo: 0, pageSize: pageSize })

    if (!success) return

    return {
        props: {
            blogAll: disposeBlogFiled(data.list),
            total: data.total
        }
    }
}
