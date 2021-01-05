import React, { useRef, useEffect } from 'react';
import Head from "next/head";
import Parallax from 'parallax-js'
import Styles from '../styles/index.module.scss'
// import img from '../public/image/bg1.jpg'
const App: React.FC = () => {
  const scene = useRef();
  useEffect(() => {
    const parallax = new Parallax(scene.current)

  }, [scene])
  return <>
    <div className={Styles.home} ref={scene}>
      <div data-depth="0.1" className={Styles.bg}>
        <img src='/image/bg1.jpg' />
      </div>
    </div>
    <div>=-==-=-=</div>
  </>
}

export default App