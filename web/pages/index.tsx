import React from 'react';
import { GetStaticProps } from 'next'
import Link from 'next/link'
import marked from 'marked'
import Parallax from 'parallax-js'
import moment from 'moment'
import Styles from '../styles/index/index.module.scss'
import { getIndexPageData } from '../api'
import { message, Tooltip } from 'antd'
import { IBlogList } from '../types/response'
import {
    SortDescendingOutlined, FontColorsOutlined, MehOutlined, HeartOutlined, AlignRightOutlined, CloseOutlined
} from '@ant-design/icons'
import LoadingDom from '../components/loading'
import { setInterval } from 'timers';
interface IAppState {
    fatherBox: {
        [props: string]: any
    }
    imgBoxStyle: {
        [props: string]: any
    }
    navHied: boolean
}

interface IAppProps {
    blogList: IBlogList[]
}

class App extends React.Component<IAppProps, IAppState> {
    private scene = React.createRef<any>();
    private timer: any = null;
    state = {
        fatherBox: {},
        imgBoxStyle: {},
        navHied: false
    }

    componentDidMount() {
        this.initParallax(this.scene.current)
        window.addEventListener('resize', this.disposeScreen, false)
        this.disposeScreen()
        document.addEventListener('scroll', () => {
            console.log(window.pageYOffset);
            clearInterval(this.timer)
        })

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.disposeScreen)
    }

    //TODO:处理图片自适应问题
    private disposeScreen = () => {
    }

    private initParallax = (DOMElement: React.ReactNode) => {
        new Parallax(DOMElement, {
            relativeInput: true,
            clipRelativeInput: true,
        })
    }
    private onNavHide = (blg: boolean) => {
        this.setState({ navHied: blg })
        const body = document.querySelector('body')
        if (blg) {
            body.style.overflowY = "hidden"
        } else {
            body.style.overflowY = ""
        }
    }
    private onSlide = () => {
        this.animate(0)
    }
    private animate = (targe: number, callback?: () => void) => {
        this.timer = setInterval(() => {
            let step = (targe - window.pageYOffset) / 10;
            step = step >= 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset === targe) {
                clearInterval(this.timer._id);
                callback && callback()
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15)

    }
    private renderNav = () => (<div className={Styles.nav} style={!this.state.navHied ? { top: '-100%' } : { top: '0' }} >
        <ul className={Styles.nav_list} >
            <li><a href="/article">Article</a></li>
            <li><a href="#">Rainy</a></li>
            <li><a href="#">Envelope</a></li>
            <li><Link href="/subscribe"><a>Subscribe</a></Link></li>
            <li><Link href="/aboutMe"><a>About</a></Link> </li>
        </ul>
        <div className={Styles.word}>
            <span>Everywhere in the world has a similar life.</span>
        </div>
    </div>)
    private renderBlogList = () => {
        const { blogList } = this.props
        return blogList.map(item => (<div className={Styles.post} key={item.id}>
            <div className={Styles.img_box}>
                <Link href={`/[${String(item.id)}]`} as={`/${String(item.id)}`}>
                    <a>
                        <img src={item.imgUrl} alt="" />
                    </a>
                </Link>

            </div>
            <div className={Styles.info}>
                <div className={Styles.time}>{moment(item.createDate).format('YYYY-MM-DD')}</div>
                <div className={Styles.title}>
                    <Link href={'/' + String(item.id)}>
                        <a style={{ color: 'black' }}>
                            {item.title}
                        </a>
                    </Link>
                </div>
                <div className={Styles.text} dangerouslySetInnerHTML={{ __html: marked(item.content, { gfm: true, xhtml: false }) as string }}>
                </div>
                <div className={Styles.stuff}>
                    <div>
                        <Tooltip title='字数' color='#ef6d57' overlayStyle={{ borderRadius: '4px' }}>
                            <FontColorsOutlined className={Styles.icon} />
                            <span className={Styles.charts}>{item.number_words}</span>
                        </Tooltip>

                    </div>
                    <div>
                        <Tooltip title='查看' color='#50bcb6' overlayStyle={{ borderRadius: '4px' }}>
                            <MehOutlined className={Styles.icon} />
                            <span className={Styles.charts}>{item.viewCount}</span>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title='点赞' color='#ffa800' overlayStyle={{ borderRadius: '4px' }}>
                            <HeartOutlined className={Styles.icon} />
                            <span className={Styles.charts}>{item.likeCount}</span>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
        ))
    }
    private renderHomeBlogList = () => {
        const { blogList } = this.props
        const item = blogList[blogList.length - 1]
        return <div className={Styles.info}>
            <div className={Styles.time}>{moment(item.createDate).format('YYYY-MM-DD')}</div>
            <div className={Styles.title}>
                <Link href={'/' + String(item.id)}>
                    <a>
                        {item.title}
                    </a>
                </Link>
            </div>
            <div className={Styles.text} dangerouslySetInnerHTML={{ __html: marked(item.content, { gfm: true, xhtml: false }) as string }}>
            </div>
        </div>
    }
    render() {
        return <div className={Styles.container}>
            <div className={Styles.home} id='home' >
                <div ref={this.scene}>
                    <div data-depth="0.4" className={Styles.bg}>
                        <img src='/image/bg.png' />
                    </div>
                </div>
                {/* <RainEffect /> */}
                <div className={Styles.head}>
                    <div className={Styles.logo} style={!this.state.navHied ? { color: '#fff' } : { color: '#333' }}>
                        <i className="web-font" >小 · 膏</i>
                    </div>
                    <div className={Styles.menu} >
                        {!this.state.navHied ? <AlignRightOutlined className='iconfont' onClick={() => this.onNavHide(true)} /> : <CloseOutlined onClick={() => this.onNavHide(false)} className='iconfont' />}
                    </div>
                </div>
                <div className={Styles.misk}></div>
                <div className={Styles.post}>
                    {this.renderHomeBlogList()}
                </div>
                {this.renderNav()}
            </div>
            <div className={Styles.content}>
                {this.renderBlogList()}
                <div className={Styles.more}>
                    {/* TODO:动态获取数据 */}
                    <div className={Styles.loadingBtn}>加载更多 </div>
                    <LoadingDom />
                </div>
            </div>
            <div className={Styles.foot}>
                <a target="_blank">
                    粤ICP备181222222号
                    </a>
            </div>
            <div className={Styles.navigationBar} onClick={this.onSlide} >
                <SortDescendingOutlined />
            </div>
        </div>
    }
}

export const getBlogList = async () => {
    try {
        const { data, success } = await getIndexPageData({ pageNo: 0, pageSize: 10 })
        if (!success) return message.error('请求错误')
        return data
    } catch (error) {
        console.log(error);
    }
}

// 获取数据
export const getStaticProps: GetStaticProps = async (context) => {
    const blogList = await getBlogList()
    return {
        props: {
            blogList: blogList.list
        },
        revalidate: 1
    }
}


export default App

