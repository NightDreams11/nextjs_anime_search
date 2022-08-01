import { About } from "../../componets/home/about/About"
import { Container } from "../../componets/home/about/Container/Container"
import { Header } from "../../componets/home/about/Header/Header"
import { Poster } from "../../componets/home/about/Poster/Poster"

const HomePage = () => {
  return (
    <About>
      <Container>
        <Header />
        <Poster />
      </Container>
    </About>
  )
}

export default HomePage
