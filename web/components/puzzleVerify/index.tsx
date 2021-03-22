import React from 'react'
import Styles from './index.module.scss'
const PuzzleVerify: React.FC = () => {

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
            <div className={Styles.btn}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}
export default PuzzleVerify