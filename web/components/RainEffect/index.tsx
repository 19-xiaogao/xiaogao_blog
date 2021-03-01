import React, { useEffect } from 'react'
// import './index.css'
// import './WebGL/index3'
const RainEffect: React.FC = () => {
    useEffect(() => {
        import('./WebGL/index3')
    })
    return (<>
        <video className='videobg' id="videobg" src="/media/video.mp4" poster="/media/video.jpg" autoPlay loop muted>
            <source src="/media/video.webm" type="video/web" />
            <source src="/media/video.mp4" type="video/mp4" />
        </video>
        <canvas id="container" width="1" height="1" style={{ position: 'absolute' }}></canvas>
        <div className='container'>
        </div>
    </>)
}
export default RainEffect