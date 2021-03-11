import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
// import Loading from '../components/loadingUrl'
import NProgress from 'nprogress'
function MyApp({ Component, pageProps }) {
    const router = useRouter()
    // const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const handleRouteStartChange = (url) => NProgress.start()
        const handleRouterEndChange = (url) => NProgress.done()
        router.events.on('routeChangeStart', handleRouteStartChange)
        router.events.on('routeChangeComplete', handleRouterEndChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteStartChange)
            router.events.off('routeChangeComplete', handleRouterEndChange)
        }
    }, [])
    return <>
        <Component {...pageProps} />
        {/* <div className='globalLoading' style={loading ? {display: 'block'} : {display: 'none'}}></div> */}
        {/* {loading ? <Loading/> : <Component {...pageProps} />} */}
    </>
}

export default MyApp
