import React from 'react';
import Parallax from 'parallax-js'
import Styles from '../styles/index.module.scss'
import {MenuOutlined} from '@ant-design/icons/lib'
import {getIndexPageData} from '../api'

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

    private renderMenu = () => {
        return <MenuOutlined/>
    }

    render() {
        return <>
            <div className={Styles.home} ref={this.scene}>
                <div data-depth="0.4" className={Styles.bg}>
                    <img src='/image/bg.png'/>
                </div>
                <MenuOutlined twoToneColor="#eb2f96" rotate={180} className={Styles.icon}/>
            </div>
        </>
    }
}

// 获取数据
export async function getStaticProps() {
    return {
        props: {
            blogList: []
        }
    }
}

export default App

