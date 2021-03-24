import React, { useEffect } from 'react'
import Styles from './index.module.scss'

const PuzzleVerify: React.FC = () => {

    useEffect(() => {

    }, [])

    const btnMouseDown = (e) => {
        console.log('鼠标按下');
        console.log(e);
        
    }
    const btnMove = (e) => {
        console.log(e);
        console.log('鼠标移动');
    }

    const mouseUp = () => {
        console.log('鼠标弹起');
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
            <div className={Styles.btn} onMouseDown={btnMouseDown} onMouseMove={btnMove} onMouseUp={mouseUp}  >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}
export default PuzzleVerify