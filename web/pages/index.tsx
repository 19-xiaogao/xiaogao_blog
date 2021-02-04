import React from 'react';
import Parallax from 'parallax-js'
import Styles from '../styles/index/index.module.scss'
import {getIndexPageData} from '../api'
import {message} from 'antd'
import LoadingDom from '../components/loading'

interface IAppState {
    fatherBox: {
        [props: string]: any
    }
    imgBoxStyle: {
        [props: string]: any
    }
}

interface IAppProps {
    blogList: []
}

class App extends React.Component<IAppProps, IAppState> {
    private scene = React.createRef<any>()
    state = {
        fatherBox: {},
        imgBoxStyle: {}
    }

    componentDidMount() {
        getBlogList().then(res => {
            console.log(res)
        })
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

    render() {
        return <div>
            <div className={Styles.home}>
                <div ref={this.scene}>
                    <div data-depth="0.4" className={Styles.bg}>
                        <img src='/image/bg.png'/>
                    </div>
                </div>
                <div className={Styles.head}>
                    <div className={Styles.logo}>
                        <i className="web-font">小 · 膏</i>
                    </div>
                    <div className={Styles.menu}>
                        <span className="iconfont">&#xe628;</span>
                    </div>
                </div>
            </div>
            <LoadingDom/>
        </div>
    }
}

const getBlogList = async () => {
    const {data, success} = await getIndexPageData({pageNo: 1, pageSize: 10})
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

