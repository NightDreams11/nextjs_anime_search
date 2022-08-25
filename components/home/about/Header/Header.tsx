import "./Header.scss"
import logo from "../../../../img/logo.svg"

export const Header = () => {
  return (
    <>
      <nav className="about__nav">
        <ul>
          <li>İletişim</li>
          <li>Hakkımda</li>
          <li>Çalışmalarım</li>
        </ul>
      </nav>
      <div className="about__logo">
        <img src={logo.src} alt="next" />
      </div>
    </>
  )
}
