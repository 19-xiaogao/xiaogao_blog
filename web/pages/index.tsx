import React, { useRef, useEffect, useState } from 'react';
import Head from "next/head";
import Parallax from 'parallax-js'
import Styles from '../styles/index.module.scss'

interface IData {
  name: string
  age: number
  sum: number
}



const App: React.FC = () => {
  // scene code fromage
  const scene = useRef();
  useEffect(() => {
    const parallax = new Parallax(scene.current)
  }, [scene])
  // console.log(window)
  // 处理图片的宽高 code fromage
  const innerWidth = useState<Number>(0),
    innerHeight = useState<Number>(0)
  useEffect(() => {
    const resizeDispose = () => {
      console.log(window.innerWidth)
      console.log(window.innerHeight)
    }
    window.addEventListener('resize', resizeDispose, false)
    return () => {
      window.removeEventListener('resize', resizeDispose)
    }
  }, [innerWidth, innerHeight])
  return <>
    <div className={Styles.home} ref={scene}>
      <div data-depth="0.4" className={Styles.bg}>
        <img src='/image/bg.png' />
      </div>
    </div>
  </>
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