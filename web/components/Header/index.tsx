import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss'
import { useRouter } from 'next/router'
import { PauseOutlined, HeartFilled } from '@ant-design/icons'
interface IHeaders {
    logo?: boolean
    title?: string
    onOk?: () => void
    blogId?: number
}
const Header: React.FC<IHeaders> = (props) => {
    const [play, setPlay] = useState<boolean>(false)
    const [scrollView, setScrollView] = useState<boolean>(false)
    const [pageUOffset, setPageUOffset] = useState<number>(0)
    const [isGoodLike, setIsGoodLike] = useState<boolean>(false)
    const router = useRouter()
    const jumpHomePage = (e) => {
        e.preventDefault()
        router.push('/')
    }
    useEffect(() => {
        let rememberPageYOffset = window.pageYOffset;
        const onScroll = (e) => {
            if (window.pageYOffset > rememberPageYOffset) {
                setScrollView(true)
            } else {
                setScrollView(false)
            }
            rememberPageYOffset = window.pageYOffset
            setPageUOffset(window.pageYOffset)
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const goodLike = JSON.parse(localStorage.getItem('goodLike')) || [];
        const findResult = goodLike.find(item => item.id === props.blogId);
        if (!findResult) {
            setIsGoodLike(false)
        } else {
            setIsGoodLike(true)
        }
    }, [])

    const onClickLike = () => {
        if (isGoodLike) return
        const goodLike = JSON.parse(localStorage.getItem('goodLike'))
        console.log(goodLike);
        localStorage.setItem('goodLike', JSON.stringify(goodLike.content({ id: props.blogId, goodLike: true })))
        props.onOk()
        setIsGoodLike(true)
    }


    return <header className={Styles.header} style={scrollView ? { display: 'none' } : { display: 'block' }}>
        <div className={Styles.logo}>
            <i className="web-font" onClick={jumpHomePage} >小 · 膏</i>
            {!play ? <div className={Styles.triangle} onClick={() => setPlay(true)} /> : <PauseOutlined onClick={() => setPlay(false)} />}
        </div>
        <div className={Styles.title} style={pageUOffset < 20 ? { display: 'none' } : { display: 'block' }}>{props.title}</div>
        <div className={Styles.menuIcon}>
            {props.logo ? <HeartFilled onClick={onClickLike} className={isGoodLike ? Styles.like : ''} /> : null}
            <span className={Styles.img} >
                <img src="/image/4.jpg" alt="" />
            </span>
        </div>
    </header>
}
export default Header