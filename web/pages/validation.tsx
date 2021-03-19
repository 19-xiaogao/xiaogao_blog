import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Styles from '../styles/validationCss/index.module.scss'

import { subscribe_verify } from '../api/api'
import { message } from 'antd'

const Validation: React.FC = () => {

    const router = useRouter()

    const [verifyCode, setVerifyCode] = useState<string>('')

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
            return message.warn('请输入6位数')
        }
        const { email, id } = urlParams()

        const { success, data } = await subscribe_verify({ VerificationCode: verifyCode, email, id })
        if (!success) return message.error('验证邮箱失败')
        message.success("验证邮箱成功")
        setVerifyCode('')
        router.push('/')
    }

    return <div className={Styles.bigBox}>
        <div className={Styles.validation}>
            <h2>订阅邮箱验证</h2>
            <div>
                <input type="text" placeholder="输入验证码" onChange={onVerifyCodeChange} />
                <button onClick={sumbitVerify}>提交</button>
            </div>
        </div>
    </div>
}

export default Validation