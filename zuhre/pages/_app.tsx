import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = "http://localhost:4000/"
  return <Component {...pageProps} />
}
export default MyApp
