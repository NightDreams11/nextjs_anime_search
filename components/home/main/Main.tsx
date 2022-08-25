import { Container } from "./Container/Container"
import "./Main.scss"
import img01 from "../../../img/01.png"
import img02 from "../../../img/02.png"
import img03 from "../../../img/03.png"
import img04 from "../../../img/04.png"
import img05 from "../../../img/05.png"
import img06 from "../../../img/06.png"
import img07 from "../../../img/07.png"
import img08 from "../../../img/08.png"
import { BodyContainer } from "../bodyContainer/bodyContainer"

export const Main = () => {
  return (
    <>
      <div className="main">
        <BodyContainer>
          <Container>
            <div className="main__title">Çalışmalarım</div>
            <div className="main__image-container">
              <img src={img01.src} alt="main1" />
              <img src={img02.src} alt="main2" />
              <img src={img03.src} alt="main3" />
              <img src={img04.src} alt="main4" />
              <img src={img05.src} alt="main5" />
              <img src={img06.src} alt="main6" />
              <img src={img07.src} alt="main7" />
              <img src={img08.src} alt="main8" />
            </div>
            <div className="main__footer-title">Daha Fazla Göster</div>
          </Container>
        </BodyContainer>
      </div>
    </>
  )
}
