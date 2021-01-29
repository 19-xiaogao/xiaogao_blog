import React from 'react';
import Parallax from 'parallax-js'
import Styles from '../styles/index.module.scss'
import { MenuOutlined } from '@ant-design/icons/lib'
import { getIndexPageData } from '../api'
import { message } from 'antd'

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
        console.log(this.props);
        getBlogList().then(res =>{
            console.log(res)
        })
        this.initParallax(this.scene.current)
        window.addEventListener('resize', this.disposeScreen, false)
        this.disposeScreen()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.disposeScreen)
    }

    //TODO: 处理图片自适应问题
    private disposeScreen = () => {
    }

    private initParallax = (DOMElement: React.ReactNode) => {
        new Parallax(DOMElement, {
            relativeInput: true,
            clipRelativeInput: true,
        })
    }

    render() {
        return <>
            <div className={Styles.home} ref={this.scene}>
                <div data-depth="0.4" className={Styles.bg}>
                    <img src='/image/bg.png' />
                </div>
                <MenuOutlined twoToneColor="#eb2f96" rotate={180} className={Styles.icon} />
            </div>
        </>
    }
}

const getBlogList = async () => {
    const { data, success } = await getIndexPageData({ pageNo: 1, pageSize: 10 })
    if (!success) return message.error('请求错误')
    return data
}

// 获取数据
export async function getStaticProps() {
    const blogList: [] =[]
    return {
        props: {
            blogList: blogList
        }
    }
}

export default App

