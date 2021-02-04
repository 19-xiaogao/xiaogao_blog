import React from 'react'
import Styles from './index.module.scss'
// css loading 效果
const LoadingDOM: React.FC = () => {
    return (<div className={Styles.loadingBox}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>)
}
export default LoadingDOM
