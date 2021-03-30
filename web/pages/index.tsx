import React from 'react';
import { GetStaticProps } from 'next'
import Link from 'next/link'
import marked from 'marked'
import Parallax from 'parallax-js'
import moment from 'moment'
import Styles from '../styles/index/index.module.scss'
import { getIndexPageData } from '../api/api'
import { message, Tooltip } from 'antd'
import { IBlogList } from '../types/response'
import {
    SortDescendingOutlined, FontColorsOutlined, MehOutlined, HeartOutlined, AlignRightOutlined, CloseOutlined
} from '@ant-design/icons'
import LoadingDom from '../components/loading'
import { setInterval } from 'timers';
import Helmet from '../components/Helmet'

interface IAppState {
    fatherBox: {
        [props: string]: string
    }
    screenHeight: number
    imgBoxStyle: {
        [props: string]: string
    }
    navHied: boolean
    loadingMore: boolean
    blogList: IBlogList[] | any[]
    pageNo: number
    pageSize: number
    total: number
}

interface IAppProps {
    // blogList: IBlogList[]
    // total: number
}
let pageSize = 5
class App extends React.Component<IAppProps, IAppState> {
    private scene = React.createRef<any>();
    private timer: any = null;

    constructor(props) {
        super(props)
        this.state = {
            fatherBox: {},
            imgBoxStyle: {},
            navHied: false,
            loadingMore: false,
            screenHeight: 0,
            blogList: [],
            pageNo: 1,
            pageSize: 5,
            total: 0
        }
    }

    componentDidMount() {
        const { pageNo, pageSize } = this.state
        this.initParallax(this.scene.current)
        window.addEventListener('resize', this.disposeScreen, false)
        this.disposeScreen()
        document.addEventListener('scroll', () => {
            clearInterval(this.timer)
        })
        this.initData(pageNo, pageSize)
    }
    private async initData(pageNo: number, pageSize: number) {
        this.setState({ loadingMore: true })
        const responseData = await getBlogList({ pageNo, pageSize })
        this.setState({ blogList: responseData.list, total: responseData.total, loadingMore: false })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.disposeScreen)
    }

    private disposeScreen = () => {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        const { featherBox, imgBoxStyle } = this.calculateFatherBox(width, height)
        this.setState({ fatherBox: featherBox, screenHeight: height, imgBoxStyle: imgBoxStyle })
    }

    private calculateFatherBox(w, h) {
        let _w = parseInt(w),
            _h = parseInt(h),
            x, y, i,
            e = (_w >= 1000 || _h >= 1000) ? 1000 : 500;
        if (_w >= _h) {
            i = _w / e * 50;
            y = i;
            x = i * _w / _h;
        } else {
            i = _h / e * 50;
            x = i;
            y = i * _h / _w;
        }
        const featherBox = {
            width: _w + x + 'px',
            height: _h + y + 'px',
            marginLeft: - 0.5 * x + 'px',
            marginTop: - 0.5 * y + 'px'
        }
        const imgBoxStyle = this.calculateBox(_w + x, _h + y)
        return { featherBox, imgBoxStyle }
    }
    private calculateBox(w, h) {
        const width = parseInt(w),
            height = parseInt(h),
            ratio = 1080 / 1920,
            style: any = {};

        const compute = height / width > ratio;

        style['width'] = compute ? (height / ratio + 'px') : `${width}px`;
        style['height'] = compute ? `${height}px` : (width * ratio + 'px');

        style['left'] = (width - parseInt(style.width)) / 2 + 'px';
        style['top'] = (height - parseInt(style.height)) / 2 + 'px';
        return style
    }

    private loadMore = () => {
        const { pageNo, pageSize } = this.state
        this.setState(() => ({ pageNo: this.state.pageSize + 5 }))
        this.initData(pageNo, pageSize + 5)
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

    private renderNav = () => (<div className={Styles.nav} style={!this.state.navHied ? { top: '-100%' } : { top: '0' }}>
        <ul className={Styles.nav_list} >
            <li><a href="/article">Article</a></li>
            <li><a href="/messageBoard">MessageBoard</a></li>
            <li><Link href="/subscribe"><a>Subscribe</a></Link></li>
            <li><Link href="/aboutMe"><a>AboutMe</a></Link> </li>
        </ul>
        <div className={Styles.word}>
            <span>Everywhere in the world has a similar life.</span>
        </div>
    </div>)

    private renderBlogList = () => {
        const { blogList } = this.state
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
                        <Tooltip title='字符' color='#ef6d57' overlayStyle={{ borderRadius: '4px' }}>
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
        const { blogList } = this.state
        const item = blogList.length > 0 ? blogList[blogList.length - 1] : {
            id: 1,
            createDate: '',
            content: '',
            title: ''
        }
        return <div className={Styles.info}>
            <div className={Styles.time}>{moment(item.createDate).format('YYYY-MM-DD')}</div>
            <div className={Styles.title}>
                <Link href={'/' + String(item.id)}>
                    <a>{item.title}</a>
                </Link>
            </div>
            <div className={Styles.text} dangerouslySetInnerHTML={{ __html: marked(item.content, { gfm: true, xhtml: false }) as string }}>
            </div>
        </div>
    }
    render() {

        return <div className={Styles.container}>
            <Helmet title=" home | 小膏" />
            <div className={Styles.home} >
                <div ref={this.scene} className={Styles.scene} style={{ height: this.state.screenHeight + 'px' }} >
                    <div data-depth="0.4" className={Styles.bg} style={this.state.fatherBox} >
                        <img src='/image/bg.png' style={this.state.imgBoxStyle} />
                    </div>
                </div>
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
                <div className={Styles.more} onClick={this.loadMore}>
                    {this.state.total === this.state.blogList.length ? <div className={Styles.bottomTest}>到底了</div> : this.state.loadingMore ? <LoadingDom /> : <div className={Styles.loadingBtn}>加载更多 </div>}
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

export const getBlogList = async (params) => {
    try {
        const { data, success } = await getIndexPageData({ pageNo: params.pageNo, pageSize: params.pageSize })
        if (!success) return message.error('请求错误')
        return data
    } catch (error) {
        console.log(error);
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    return {
        props: {

        },
        revalidate: 1
    }
}


export default App

