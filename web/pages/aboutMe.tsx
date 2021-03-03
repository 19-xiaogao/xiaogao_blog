import React from 'react'
import Helmet from '../components/Helmet'
import PageHeader from '../components/Header'
import Styles from '../styles/aboutMe/index.module.scss'
import { Popover } from 'antd'
import {
    WechatOutlined,
    MailOutlined,
    GithubOutlined
} from '@ant-design/icons'
const AboutMe: React.FC = () => {
    const WxContent = (<div className={Styles.img}><img src="/image/wx.jpg"></img></div>)
    const mailContent = (<div>longjiuwei999@163.com</div>)
    const githubContent = (<div>此项目的开源地址, 来个star~</div>)

    return <div>
        <Helmet title="He 我是小膏" />
        <PageHeader />
        <div className={Styles.content}>
            <h1 className={Styles.h1}>你好,我是小膏！</h1>
            <ul className={Styles.ul}>
                <li>生于南方一九九*,圣诞节</li>
                <li>喜欢雨天,酷爱独处</li>
                <li>喜欢玩CS:GO,技术很菜</li>
                <li>有着远大抱负,却是思想上的巨人</li>
                <li>喜欢滑板,只能过二立</li>
                <li>励志名言:生活的所有馈赠都在暗中标号了价码</li>
                <li>陌生人，你好呀，承蒙遇见，三生有幸，永远年轻，永远热泪满盈，终身美丽~~</li>
                <li>欢迎你的逗留，非常荣幸能在你的回忆里留下我的脚印，匆匆忙忙的人生，也许过客一场~~</li>
            </ul>
            <div className={Styles.icons}>
                <Popover content={WxContent} >
                    <div>
                        <WechatOutlined style={{ color: '#cacaca' }} />
                    </div>
                </Popover>
                <Popover content={mailContent} >
                    <div>
                        <MailOutlined style={{ color: '#cacaca' }} />
                    </div>
                </Popover>
                <Popover content={githubContent} >
                    <div>
                        <GithubOutlined style={{ color: '#cacaca' }} />
                    </div>
                </ Popover >
            </div>
        </div>
    </div>
}

export default AboutMe