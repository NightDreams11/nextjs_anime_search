import "./Footer.scss"
import { BodyContainer } from "../bodyContainer/bodyContainer"
import logo from "../../../img/footerLogo.png"

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <BodyContainer>
          <div className="footer__container">
            <div>
              <img src={logo.src} alt="FooterLogo" />
            </div>
            <div className="footer__text">
              <div className="footer__title">Hakkımda</div>
              <div className="footer__desc">Henüz bu alan doldurulmadı.</div>
            </div>
          </div>
        </BodyContainer>
      </div>
    </>
  )
}
