import "../styles/globals.css"
import type { AppProps } from "next/app"
import { StoreProvider } from "../store/store"
// import "../components/home/about/Header/Header.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider {...pageProps}>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            overflow-x: hidden;
            background-color: #f7f5fc;
          }
        `}</style>
      </StoreProvider>
    </>
  )
}

export default MyApp
