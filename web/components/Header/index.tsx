import React, { useState } from 'react'
import Styles from './index.module.scss'
import { useRouter } from 'next/router'
import { CaretRightOutlined, PauseOutlined, WechatOutlined, HeartFilled } from '@ant-design/icons'
interface IHeaders {
    logo?: boolean
}
const Header: React.FC<IHeaders> = (props) => {
    const [play, setPlay] = useState<boolean>(false)
    const router = useRouter()
    const jumpHomePage = (e) => {
        e.preventDefault()
        router.push('/')
    }
    //TODO: 添加viedo 标签 播放背景音乐
    return <header className={Styles.header}>
        <div className={Styles.logo}>
            <i className="web-font" onClick={jumpHomePage}>小 · 膏</i>
            {!play ? <CaretRightOutlined onClick={() => setPlay(true)} /> : <PauseOutlined onClick={() => setPlay(false)} />}
        </div>
        <div className={Styles.menuIcon}>
            {/* <WechatOutlined /> */}

            {props.logo ? <HeartFilled /> : null}
            <span className={Styles.img} >
                <img src="/image/4.jpg" alt="" />
            </span>
        </div>
    </header>
}
export default Header