import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Styles from '../styles/err404.module.scss'
function Custom404() {
   
    return <div className={Styles.err404} >
        <Image src="/image/err404.png" width='600' height='500' className={Styles.img}   />
    </div>
}

export default Custom404