import React, { useState } from 'react'
import Styles from './index.module.scss'
import { CaretRightOutlined, PauseOutlined, WechatOutlined, HeartFilled } from '@ant-design/icons'
interface IHeaders {
}
const Header: React.FC<IHeaders> = (props) => {
    const [play, setPlay] = useState<boolean>(false)
    return <header className={Styles.header}>
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
    </header>
}
export default Header