import React from 'react'
import Styles from './index.module.css';
const LoadingUrl: React.FC = () => (
    <div className={Styles.loading}>
        <div className={Styles.loading_center}>
            <div className={Styles.loading_absolute}>
                <div className={`${Styles.object} ${Styles.object_four} `} ></div>
                <div className={`${Styles.object} ${Styles.object_three}`}></div>
                <div className={`${Styles.object} ${Styles.object_two}`} ></div>
                <div className={`${Styles.object} ${Styles.object_one}`} ></div>
            </div>
        </div>
    </div>
)
export default LoadingUrl