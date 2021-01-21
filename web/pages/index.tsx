import React from 'react';
import Head from "next/head";
import Parallax from 'parallax-js'
import Styles from '../styles/index.module.scss'

interface IAppState {

  fatherBox: {
    FBoxW: number
    FBoxH: number
    marginLeft: number
    marginTop: number
  }

  imgBoxStyle: {
    boxW: number
    boxH: number
    boxTop: number
    boxLeft: number
  }
}

class App extends React.Component<{}, IAppState>{
  private scene = React.createRef<any>()
  state = {
    fatherBox: {
      FBoxW: 0,
      FBoxH: 0,
      marginLeft: 0,
      marginTop: 0
    },
    imgBoxStyle: {
      boxW: 0,
      boxH: 0,
      boxTop: 0,
      boxLeft: 0
    }
  }
  componentDidMount() {
    this.initParallax(this.scene.current)
    this.disposeScreen()
    window.addEventListener('resize', this.disposeScreen, false)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.disposeScreen)
  }
  private initParallax = (DOMElement: React.ReactNode) => {
    new Parallax(DOMElement, {
      relativeInput: true,
      clipRelativeInput: true,
    })
  }
  private disposeScreen = () => {
    // 原图片是1920 * 1080
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    console.log(width / 1920)
    const boxLeft = -((width / 0.9) - width) / 2;
    const boxTop = -((height / 0.9) - height) / 2;
    //   this.setState({
    //     boxW: width,
    //     boxH: height,
    //     boxTop: boxLeft,
    //     boxLeft: boxTop
    //   })
  }
  render() {
    // const { boxW, boxH, boxLeft, boxTop } = this.state
    // const imgStyle = { width: boxW + 'px', height: boxH + 'px', top: boxTop + 'px', left: boxLeft + 'px' }
    return <>
      <div className={Styles.home} ref={this.scene}>
        <div data-depth="0.4" className={Styles.bg}>
          <img src='/image/bg.png' />
        </div>
      </div>
    </>
  }
}

export default App

//TODO: 需要获取post参数 预渲染之前

// function Blog({ posts }) {
//   return (
//     <ul>
//       {posts.map(item => (<li key={item.id}>{item.name}</li>))}
//     </ul>
//   )
// }
// // 静态渲染数据
// export async function getStaticProps() {
//   // 调用外部 API 获取博文列表
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()
//   return {
//     props: {
//       posts,
//     },
//   }
// }

// export async function getServerSideProps() { 

// }