import "../styles/globals.css"
import { Provider } from "mobx-react"
import type { AppProps } from "next/app"
import { useStore } from "../store/store"

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initializeStore)
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            overflow-x: hidden;
          }
        `}</style>
      </Provider>
    </>
  )
}

export default MyApp
