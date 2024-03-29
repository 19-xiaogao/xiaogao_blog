import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss'
import { useRouter } from 'next/router'
import { HeartFilled } from '@ant-design/icons'
import { headerType } from '../../types/response'

interface IHeaders {
    logo?: boolean
    title?: string
    onOk?: () => void
    blogId?: number
    className?: string
    type: headerType
    likeTody?: boolean
}
const Header: React.FC<IHeaders> = (props) => {
    const [pageUOffset, setPageUOffset] = useState<number>(0)
    const router = useRouter()
    const jumpHomePage = (e) => {
        e.preventDefault()
        const body = document.querySelector('body')
        body.style.overflowY = ""
        router.push('/')
    }
    useEffect(() => {
        if (props.type !== headerType.blog_detail) {
            return () => ({})
        }
        let rememberPageYOffset = window.pageYOffset;
        const onScroll = (e) => {
            rememberPageYOffset = window.pageYOffset
            setPageUOffset(window.pageYOffset)
        }
        window.addEventListener('scroll', onScroll, false)
        return () => window.removeEventListener('scroll', onScroll, false)
    })
    const onClickLike = () => props.onOk()
    return <header className={Styles.header} style={props.type === headerType.subscribe ? { backgroundColor: '#ffffff21' } : {}}>
        <div className={Styles.logo}>
            <i className="web-font" onClick={jumpHomePage} style={props.type === headerType.subscribe ? { color: '#fff', } : { color: "black" }}>小 · 膏</i>
        </div>
        <div className={Styles.title} style={pageUOffset < 20 ? { display: 'none' } : { display: 'block' }}>{props.title}</div>
        <div className={Styles.menuIcon}>
            {props.logo ? <HeartFilled onClick={onClickLike} className={props.likeTody ? Styles.like : ''} /> : null}
            <span className={Styles.img} >
                <img src="/image/4.jpg" alt="" onClick={() => router.push('/aboutMe')} />
            </span>
        </div>
    </header>
}
export default Header