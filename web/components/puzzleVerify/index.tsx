import React, { useEffect, useState, useRef } from 'react'
import Styles from './index.module.scss'
let saveIntervalX = 0
let saveIntervalY = 0

interface IVerify {
    verifyResponse: (flg: boolean) => void
    close: () => void
}
const PuzzleVerify: React.FC<IVerify> = (props) => {

    const sliderBtn = useRef<any>(null)
    const sliderBar = useRef<any>(null)
    const puzzleBox = useRef<any>(null)
    const puzzleShow = useRef<any>(null)
    const puzzle_lost_box = useRef<any>(null)
    const verTips = useRef<any>(null)
    const [moveLeft, setMoveLeft] = useState<number>(-130)
    const [verifyStatus, setVerifyStatus] = useState<boolean>(false)

    let moveStart = 0;

    useEffect(() => {
        initBgCanvas()
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
        const sliderClientWidth = sliderBar.current.clientWidth;
        // 移动的距离
        const moveDistance = moveX - moveStart;

        // btn 按钮移动的最大偏移量
        //  0 > 移动的距离  >  总长度 - 按钮的宽度
        if (moveDistance >= sliderClientWidth - 40 || moveDistance < 0) {
            return
        }

        // 图片移动的最偏移量
        // 0> (随机图片的x 位置 + 55 =  图片距离 左边的偏移量) + 移动的距离  > 总长度
        if (saveIntervalX + 55 + moveDistance > sliderClientWidth) {
            return
        }

        setMoveLeft(moveLeft + moveDistance)

        sliderBtn.current.style.transition = 'inherit'

        puzzle_lost_box.current.style.transition = 'inherit'

        sliderBtn.current.style.left = moveDistance + 'px'


    }

    const endMove = (e) => {

        const left = puzzle_lost_box.current.style.left.substr(0, 1)
        verTips.current.style.bottom = '0px';
        if (left == 0) {
            setVerifyStatus(true)
            props.verifyResponse(true)
        } else {
            setVerifyStatus(false)
            props.verifyResponse(false)
        }
        removeMouseMoveListener()
        setTimeout(() => {
            sliderBtn.current.style.left = 0 + 'px'
            sliderBtn.current.style.transition = 'left .5s'
            puzzle_lost_box.current.style.transition = 'left .5s'
            verTips.current.style.bottom = '-40px';
            setMoveLeft(-130)
        }, 500);
    }
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min));
    }

    const initBgCanvas = () => {

        const ctx = puzzleBox.current.getContext('2d');

        saveIntervalX = random(0, 70); //  随机x位置
        saveIntervalY = random(25, -25); //  随机y位置
        const d = 55 / 3; // 绘制小方块 /3 



        renderCanvas(puzzleBox.current, saveIntervalX, saveIntervalY, d)
        renderCanvas(puzzleShow.current, saveIntervalX, saveIntervalY, d)
        ctx.restore();

    }


    const renderCanvas = (type, x: number, y: number, d: number) => {

        const canvas = type.getContext('2d');
        canvas.clearRect(0, 0, 260, 160);
        canvas.save();

        canvas.translate(130, 80);
        if (type.id === 'puzzle_box') {
            canvas.globalCompositeOperation = "xor"
            canvas.fillStyle = "#fff"
        }
        canvas.beginPath()

        canvas.moveTo(x, y);
        canvas.lineTo(x + d, y);
        canvas.bezierCurveTo(x + d, y - d, x + 2 * d, y - d, x + 2 * d, y);
        canvas.lineTo(x + 3 * d, y);

        canvas.lineTo(x + 3 * d, y + d);
        canvas.bezierCurveTo(x + 2 * d, y + d, x + 2 * d, y + 2 * d, x + 3 * d, y + 2 * d)

        canvas.lineTo(x + 3 * d, y + 3 * d)
        canvas.lineTo(x, y + 3 * d)
        canvas.closePath()

        if (type.id === 'puzzleShow') {
            canvas.clip()
            canvas.fill()

        } else {
            canvas.strokeStyle = "rgba(0,0,0,0)"
            canvas.stroke()
            canvas.fill()
        }
        canvas.restore();
    }


    const refresh = () => {
        initBgCanvas()
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
                <i className='iconfont icon-shuaxin' onClick={refresh}></i>
                <i className='iconfont icon-close' onClick={() => props.close()}></i>
            </div>
        </div>
        <div className={Styles.verify}>
            <div className={Styles.negative}>
                <img src="/image/bg.png" alt="" />
                <canvas width="260" height="160" id="puzzle_box" ref={puzzleBox}></canvas>
            </div>
            <div className={Styles.puzzle_lost_box} ref={puzzle_lost_box} style={{ left: moveLeft + 'px' }}>
                <canvas width='260' height='160' id='puzzleShow' ref={puzzleShow}></canvas>
            </div>
            <div className={Styles.ver_tips} ref={verTips}>
                <i className={`iconfont ${verifyStatus ? 'icon-Success' : 'icon-x'}`}></i>
                <span>{verifyStatus ? "验证通过" : '验证失败，请移动到正确位置！'}</span>
            </div>
        </div>
        <div className={Styles.slider}>
            <div className={Styles.bar} id='sliderBar' ref={sliderBar}>
            </div>
            <div className={Styles.btn} onMouseDown={startMove} onTouchStart={startMove} ref={sliderBtn} id="sliderBtn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}
export default PuzzleVerify