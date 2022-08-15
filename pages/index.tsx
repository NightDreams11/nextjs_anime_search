import type { NextPage } from "next"
import { About } from "../componets/home/about/About"
import { Footer } from "../componets/home/footer/Footer"
import { Main } from "../componets/home/main/Main"

const Home: NextPage = () => {
  return (
    <>
      <About />
      <Main />
      <Footer />
    </>
  )
}

export default Home
