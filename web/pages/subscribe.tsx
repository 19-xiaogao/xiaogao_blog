import React, { useState } from 'react'
import Helmet from '../components/Helmet'
import Texty from 'rc-texty';
import PageHeader from '../components/Header'
import Wave from '../components/wave'
import Styles from '../styles/subscribe/index.module.scss'
import { headerType } from '../types/response'
import { Email } from '../util/RegExp'
import 'rc-texty/assets/index.css';
const Subscribe: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [warnTextTow, setWarnTextTow] = useState<string>('')
    const [warnTextNo, setWarnTextNo] = useState<string>('')
    const userChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }
    const subscribe = () => {
        if (userEmail.trim() === '') {
            setWarnTextNo('')
            return setWarnTextTow('填写邮箱地址!')
        }
        if (!Email.test(userEmail)) {
            setWarnTextTow('')
            return setWarnTextNo('请输入正确的邮箱地址!')
        }
        setWarnTextTow('')
        setWarnTextNo('')
        // 订阅
    }
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
                <input type="text" placeholder="Your email address" onChange={userChange} />
                <Texty className={Styles.warnText}>{warnTextTow}</Texty>
                <Texty className={Styles.warnText}>{warnTextNo}</Texty>
                <button onClick={subscribe}>subscribe</button>
            </div>
        </div>
        <Wave />
    </div>
}
export default Subscribe