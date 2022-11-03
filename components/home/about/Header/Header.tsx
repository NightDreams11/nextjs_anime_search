import "./Header.scss"
import logo from "../../../../img/logo.svg"
import Link from "next/link"

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
        <Link href="/films">
          <a>
            <img src={logo.src} alt="next" />
          </a>
        </Link>
      </div>
    </>
  )
}
