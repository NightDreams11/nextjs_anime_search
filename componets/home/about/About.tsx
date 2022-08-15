import { BodyContainer } from "../bodyContainer/bodyContainer"
import "./About.scss"
import { Container } from "./Container/Container"
import { Header } from "./Header/Header"
import { Poster } from "./Poster/Poster"

export const About = () => {
  return (
    <div className="about">
      <BodyContainer>
        <div className="about__triangle" />
        <Container>
          <Header />
          <Poster />
        </Container>
      </BodyContainer>
    </div>
  )
}
