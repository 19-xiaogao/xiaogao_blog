import React from 'react'
import Styles from './index.module.css';
import classnames from 'classnames'
interface ILoading {
    className?: string
    style?: any
}
const LoadingUrl: React.FC<ILoading> = (props) => {
    const classNames = classnames({
        [Styles.loading]: true,
        [props.className]: !!props.className
    })
    return (<div className={classNames} style={props.style} >
        <div className={Styles.loading_center}>
            <div className={Styles.loading_absolute}>
                <div className={`${Styles.object} ${Styles.object_four} `} ></div>
                <div className={`${Styles.object} ${Styles.object_three}`}></div>
                <div className={`${Styles.object} ${Styles.object_two}`} ></div>
                <div className={`${Styles.object} ${Styles.object_one}`} ></div>
            </div>
        </div>
    </div>)
}
export default LoadingUrl