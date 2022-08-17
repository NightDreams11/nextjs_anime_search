import "../styles/globals.css"
import { Provider } from "mobx-react"
import type { AppProps } from "next/app"
import { StoreProvider, useStore } from "../store/store"

function MyApp({ Component, pageProps }: AppProps) {
  // const store = useStore(pageProps.initialState)
  return (
    <>
      <StoreProvider {...pageProps}>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            overflow-x: hidden;
          }
        `}</style>
      </StoreProvider>
    </>
  )
}

export default MyApp
