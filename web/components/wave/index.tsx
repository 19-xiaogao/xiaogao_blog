import React from 'react'
import Styles from './index.module.scss'
// 大海浪
const Wave = () => {
    return (<div data-v-89e001c2="" className={Styles.waves_area}><svg data-v-89e001c2="" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto" className={Styles.waves_svg}><defs data-v-89e001c2=""><path data-v-89e001c2="" id="gentle-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"></path></defs> <g data-v-89e001c2="" className={Styles.parallax}><use data-v-89e001c2="" xlinkHref="#gentle-wave" x="48" y="0"></use> <use data-v-89e001c2="" xlinkHref="#gentle-wave" x="48" y="3"></use> <use data-v-89e001c2="" xlinkHref="#gentle-wave" x="48" y="5"></use> <use data-v-89e001c2="" xlinkHref="#gentle-wave" x="48" y="7"></use></g></svg></div>)
}
export default Wave