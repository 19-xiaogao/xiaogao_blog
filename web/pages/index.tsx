import React from 'react';
import Parallax from 'parallax-js'
import Styles from '../styles/index/index.module.scss'
import { getIndexPageData } from '../api'
import { message, Tooltip } from 'antd'
import {
    SortDescendingOutlined, FontColorsOutlined, MehOutlined, HeartOutlined, AlignRightOutlined, CloseOutlined
} from '@ant-design/icons'
import LoadingDom from '../components/loading'

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
    blogList: []
}

class App extends React.Component<IAppProps, IAppState> {
    private scene = React.createRef<any>()
    state = {
        fatherBox: {},
        imgBoxStyle: {},
        navHied: false
    }

    componentDidMount() {
        this.initParallax(this.scene.current)
        window.addEventListener('resize', this.disposeScreen, false)
        this.disposeScreen()
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
        const body = document.querySelector('body')
        window.scrollTo(0, 0)
        // console.log(body.scrollTop);
        
    }
    private renderNav = () => (<div className={Styles.nav} style={!this.state.navHied ? { top: '-100%' } : { top: '0' }} >
        <ul className={Styles.nav_list} >
            <li><a href="#">Article</a></li>
            <li><a href="#">Rainy</a></li>
            <li><a href="#">Envelope</a></li>
            <li><a href="#">Subscribe</a></li>
            <li><a href="#">About</a></li>
        </ul>
        <div className={Styles.word}>
            <span>Everywhere in the world has a similar life.</span>
        </div>
    </div>)
    render() {
        return <div className={Styles.container} >
            <div className={Styles.home} >
                <div ref={this.scene}>
                    <div data-depth="0.4" className={Styles.bg}>
                        <img src='/image/bg.png' />
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
                    <div className={Styles.info}>
                        <div className={Styles.time}>2020-2-5</div>
                        <div className={Styles.title}>
                            <a href="#">
                                做个烂人
                            </a> </div>
                        <div className={Styles.text}>
                            未名湖边的桃花开了，我曾经无数次梦想过，花开时湖边折枝的人群里会有自己的身影。那个时候，我的心情和大家一样迫切，目光却比你们更加,
                            我的心情和大家一样迫切，目光却比你们更加我的心情和大家一样迫切，目光却比你们更加
                        </div>
                    </div>
                </div>
                {this.renderNav()}
            </div>
            <div className={Styles.content}>
                <div className={Styles.post}>
                    <div className={Styles.img_box}>
                        <img src="/image/bg1.jpg" alt="" />
                    </div>
                    <div className={Styles.info}>
                        <div className={Styles.time}>2020-2-5</div>
                        <div className={Styles.title}>
                            做个烂人</div>
                        <div className={Styles.text}>
                            未名湖边的桃花开了，我曾经无数次梦想过，花开时湖边折枝的人群里会有自己的身影。那个时候，我的心情和大家一样迫切，目光却比你们更加,
                            我的心情和大家一样迫切，目光却比你们更加我的心情和大家一样迫切，目光却比你们更加

                        </div>
                        <div className={Styles.stuff}>
                            <div>
                                <Tooltip title='字数' color='#ef6d57' overlayStyle={{ borderRadius: '4px' }}>
                                    <FontColorsOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                            <div>
                                <Tooltip title='查看' color='#50bcb6' overlayStyle={{ borderRadius: '4px' }}>

                                    <MehOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title='点赞' color='#ffa800' overlayStyle={{ borderRadius: '4px' }}>
                                    <HeartOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.post}>
                    <div className={Styles.img_box}>
                        <img src="/image/bg1.jpg" alt="" />
                    </div>
                    <div className={Styles.info}>
                        <div className={Styles.time}>2020-2-5</div>
                        <div className={Styles.title}>
                            做个烂人</div>
                        <div className={Styles.text}>
                            未名湖边的桃花开了，我曾经无数次梦想过，花开时湖边折枝的人群里会有自己的身影。那个时候，我的心情和大家一样迫切，目光却比你们更加,
                            我的心情和大家一样迫切，目光却比你们更加我的心情和大家一样迫切，目光却比你们更加

                        </div>
                        <div className={Styles.stuff}>
                            <div>
                                <Tooltip title='字数' color='#ef6d57' overlayStyle={{ borderRadius: '4px' }}>
                                    <FontColorsOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                            <div>
                                <Tooltip title='查看' color='#50bcb6' overlayStyle={{ borderRadius: '4px' }}>

                                    <MehOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title='点赞' color='#ffa800' overlayStyle={{ borderRadius: '4px' }}>
                                    <HeartOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.post}>
                    <div className={Styles.img_box}>
                        <img src="/image/bg1.jpg" alt="" />
                    </div>
                    <div className={Styles.info}>
                        <div className={Styles.time}>2020-2-5</div>
                        <div className={Styles.title}>
                            做个烂人</div>
                        <div className={Styles.text}>
                            未名湖边的桃花开了，我曾经无数次梦想过，花开时湖边折枝的人群里会有自己的身影。那个时候，我的心情和大家一样迫切，目光却比你们更加,
                            我的心情和大家一样迫切，目光却比你们更加我的心情和大家一样迫切，目光却比你们更加

                        </div>
                        <div className={Styles.stuff}>
                            <div>
                                <Tooltip title='字数' color='#ef6d57' overlayStyle={{ borderRadius: '4px' }}>
                                    <FontColorsOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                            <div>
                                <Tooltip title='查看' color='#50bcb6' overlayStyle={{ borderRadius: '4px' }}>

                                    <MehOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title='点赞' color='#ffa800' overlayStyle={{ borderRadius: '4px' }}>
                                    <HeartOutlined className={Styles.icon} />
                                    <span className={Styles.charts}>222</span>
                                </Tooltip>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.more}>
                    <div>加载更多</div>
                </div>
            </div>
            <LoadingDom />
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

const getBlogList = async () => {
    const { data, success } = await getIndexPageData({ pageNo: 1, pageSize: 10 })
    if (!success) return message.error('请求错误')
    return data
}

// 获取数据
export async function getStaticProps() {
    const blogList: [] = []
    return {
        props: {
            blogList: blogList
        }
    }
}

export default App

