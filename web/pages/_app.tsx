import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import Loading from '../components/loadingUrl'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const handleRouteStartChange = (url) => {
      setLoading(true)
    }
    const handleRouterEndChange = (url) => {
      setLoading(false)
    }
    router.events.on('routeChangeStart', handleRouteStartChange)
    router.events.on('routeChangeComplete', handleRouterEndChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteStartChange)
      router.events.off('routeChangeComplete', handleRouterEndChange)
    }
  }, [])
  return <>
    <div className='globalLoading' style={loading ? { display: 'block' } : { display: 'none' }}></div>
    {loading ? <Loading /> : <Component {...pageProps} />}
  </>
}

export default MyApp
