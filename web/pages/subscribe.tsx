import React from 'react'
import Helmet from '../components/Helmet'
import PageHeader from '../components/Header'
import Wave from '../components/wave'
import Styles from '../styles/subscribe/index.module.scss'
import { headerType } from '../types/response'
const Subscribe: React.FC = () => {
    return <div className={Styles.content}>
        <Helmet title="He 我是小膏" />
        <PageHeader type={headerType.subscribe} />
        <h1 className={Styles.h1}>[ 死亡如风-常伴无声 ]</h1>
        <div className={Styles.beginBox}>
            <h1>嘿，你今天笑了么 ~~</h1>
            <p>
                愿你雨天有伞，深夜有灯，一生温暖纯良，不舍爱与自由。
                与尘世的万千美好都能不期而遇。
                欢迎订阅心情小镇的新文章通知，愿好~~
                        </p>
            <div className={Styles.inputBox}>
                <input type="text" placeholder="Your email address" />
                <button>subscribe</button>
            </div>
        </div>
        <Wave />
    </div>
}
export default Subscribe