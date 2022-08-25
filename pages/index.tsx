import type { NextPage } from "next"
import { About } from "../components/home/about/About"
import { Footer } from "../components/home/footer/Footer"
import { Main } from "../components/home/main/Main"

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
