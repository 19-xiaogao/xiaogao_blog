import React, { useEffect, useState } from 'react'
import Styles from './index.module.scss'

const PuzzleVerify: React.FC = () => {
    const [sliderBtn, setSliderBtn] = useState<any>(null)
    const [sliderBar, setSliderBar] = useState<any>(null)
    const [puzzleCanvas, setPuzzleCanvas] = useState<any>(null)
    let moveStart = 0;

    useEffect(() => {
        setSliderBtn(document.querySelector('#sliderBtn'))
        setSliderBar(document.querySelector('#sliderBar'))
        // setPuzzleCanvas(document.querySelector('#puzzle_box'))
        initCanvas(document.querySelector('#puzzle_box'))
    }, [])


    const startMove = (e) => {

        e = e || window.event;
        moveStart = e.pageX || e.targetTouches[0].pageX
        addMouseMoveListener()
    }

    const moving = (e) => {

        e = e || window.event;
        const moveX = e.pageX || e.targetTouches[0].pageX;
        // 线的总长度
        const sliderClientWidth = sliderBar.clientWidth;
        // 移动的距离
        const moveDistance = moveX - moveStart;

        if (moveDistance >= sliderClientWidth - 40 || moveDistance < 0) {
            return
        }

        sliderBtn.style.left = moveDistance + 'px'
        sliderBtn.style.transition = 'inherit'
    }

    const endMove = (e) => {

        sliderBtn.style.left = 0 + 'px'
        sliderBtn.style.transition = 'left .5s'
        removeMouseMoveListener()
    }

    const initCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        console.log(ctx);
        let img = new Image()
        img.src = '/image/bg.png'
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 260, 160)
        }
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
                {/* <img src="/image/bg.png" alt="" /> */}
                <canvas width="260" height="160" id="puzzle_box"></canvas>
            </div>
        </div>
        <div className={Styles.slider}>
            <div className={Styles.bar} id='sliderBar'></div>
            <div className={Styles.btn} onMouseDown={startMove} onTouchStart={startMove} id="sliderBtn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}
export default PuzzleVerify