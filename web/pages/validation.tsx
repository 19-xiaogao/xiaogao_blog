import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

import Styles from '../styles/validationCss/index.module.scss'

import { subscribe_verify } from '../api/api'
import Helmet from '../components/Helmet'
import { message } from 'antd'

const Validation: React.FC = () => {

    const router = useRouter()

    const [verifyCode, setVerifyCode] = useState<string>('')
    const [warnMessage, setWarnMessage] = useState<string>('')

    const onVerifyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyCode(e.target.value)
    }

    const urlParams = () => {

        const location = window.location.href

        const params = location.split('?')[1].split('&');

        return {
            email: params[0].split('=')[1],
            id: params[1].split('=')[1]
        }

    }


    const sumbitVerify = async () => {
        if (verifyCode.trim().length !== 6) {
            return setWarnMessage('请输入6位数')
        }
        const { email, id } = urlParams()

        const { success, data } = await subscribe_verify({ VerificationCode: verifyCode, email, id })
        if (!success) return message.error('验证邮箱失败')
        message.success("验证邮箱成功")
        setVerifyCode('')
        router.push('/')
    }

    return <div className={Styles.bigBox}>
        <Helmet title='验证 | 小膏' />
        <div className={Styles.validation}>
            <h2>订阅邮箱验证</h2>
            <div className={Styles.entryBox}>
                <input type="text" placeholder="输入验证码" onChange={onVerifyCodeChange} />
                <button onClick={sumbitVerify}>提交</button>
            </div>
            <Texty className={Styles.rules}>{warnMessage}</Texty>
        </div>
    </div>
}

export default Validation