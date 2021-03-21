import React from 'react'

import { HaprySvg, Happy2Svg, Happy3Svg, Happy4Svg } from '../components/svg/svg';

import Header from '../components/Header'
import { headerType } from '../types/response'

import Styles from '../styles/messageBoard/index.module.scss'

const MessageBoard: React.FC = () => {


    const onclonse = () => {
        const warnMessage = document.getElementById('warnMessage')
        warnMessage.style.display = 'none'
    }


    return <div className={Styles.bigBox}>
        <Header type={headerType.blog_detail} />
        <section className={Styles.section}>
            <div className={Styles.warnMeeage} id='warnMessage'>
                <span className={Styles.xx} onClick={onclonse}>×</span>
                <p>
                    <HaprySvg />
                    <span>留下你的留言</span>
                </p>
                <p>
                    <Happy2Svg />
                    <span>留下你的留言</span>
                </p>
                <p>
                    <Happy3Svg />
                    <span>留下你的留言</span>
                </p>
                <p>
                    <Happy4Svg />
                    <span>留下你的留言</span>
                </p>
            </div>
            <div className={Styles.boaard}>
                <textarea placeholder="说点什么呢..."></textarea>
                <button> <span>提交留言</span></button>
            </div>
        </section>

    </div>

}
export default MessageBoard