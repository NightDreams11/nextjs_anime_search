import poster1 from "../../../../img/1.png"
import poster2 from "../../../../img/2.png"
import poster3 from "../../../../img/3.png"
import poster4 from "../../../../img/4.png"
import poster5 from "../../../../img/5.png"
import "./Poster.scss"

export const Poster = () => {
  return (
    <>
      <div className="about__poster">
        <div className="about__poster-title">En Yeniler</div>
        <div className="about__poster-horLine1" />
        <div className="about__poster-horLine2" />
        <div className="about__poster-verLine1" />
        <div className="about__poster-verLine2" />
        <div className="about__poster-container">
          <img src={poster1.src} alt="post1" />
          <img src={poster2.src} alt="post2" />
          <img src={poster3.src} alt="post3" />
          <img src={poster4.src} alt="post4" />
          <img src={poster5.src} alt="post5" />
        </div>
      </div>
    </>
  )
}
