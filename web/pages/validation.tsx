import React from 'react'
import Styles from '../styles/validationCss/index.module.scss'
//
const Validation: React.FC = () => {
    return <div className={Styles.bigBox}>
        <div className={Styles.validation}>
            <h2>订阅邮箱验证</h2>
            <div>
                <input type="text" placeholder="输入验证码" />
                <button>提交</button>
            </div>
        </div>
    </div>
}

export default Validation