import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Container className="p-3">
        <Component {...pageProps} />
      </Container>
    </>
  )
}
