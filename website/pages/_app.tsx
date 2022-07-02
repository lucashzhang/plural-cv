import '../styles/globals.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
