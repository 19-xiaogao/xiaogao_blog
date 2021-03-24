import React, { useEffect, useState } from 'react'
import Styles from './index.module.scss'
let sliderBtn = null
const PuzzleVerify: React.FC = () => {

    let moveStart = 0;

    useEffect(() => {
        sliderBtn = document.querySelector('#sliderBtn')
        console.log(sliderBtn.style.left, '111');
    }, [])
    // TODO:计算宽度 最大宽度
    //TODO:
    const startMove = (e) => {
        e = e || window.event;
        moveStart = e.pageX || e.targetTouches[0].pageX
        addMouseMoveListener()
    }

    const moving = (e) => {
        e = e || window.event;
        const moveX = e.pageX || e.targetTouches[0].pageX;
        sliderBtn.style.left = moveX - moveStart + 'px'
        sliderBtn.style.transition = 'inherit'
    }

    const endMove = (e) => {
        sliderBtn.style.left = 0 + 'px'
        sliderBtn.style.transition = 'left .5s'
        removeMouseMoveListener()
    }

    const addMouseMoveListener = () => {
        document.addEventListener("mousemove", moving);
        document.addEventListener("touchmove", moving);
        document.addEventListener("mouseup", endMove);
        document.addEventListener("touchend", endMove);
    }
    const removeMouseMoveListener = () => {
        document.removeEventListener("mousemove", moving);
        document.removeEventListener("touchmove", moving);
        document.removeEventListener("mouseup", endMove);
        document.removeEventListener("touchend", endMove);
    }

    return <div className={Styles.container}>
        <div className={Styles.header}>
            <span className={Styles.char}>拖动下方滑块完成拼图</span>
            <div className={Styles.icon}>
                <i className='iconfont icon-shuaxin'></i>
                <i className='iconfont icon-close'></i>
            </div>
        </div>
        <div className={Styles.verify}>
            <div className={Styles.negative}>
                <img src="/image/bg.png" alt="" />
                <canvas width="260" height="160"></canvas>
            </div>
        </div>
        <div className={Styles.slider}>
            <div className={Styles.bar}></div>
            <div className={Styles.btn} onMouseDown={startMove} onTouchStart={startMove} id="sliderBtn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}
export default PuzzleVerify