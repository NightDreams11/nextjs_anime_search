import Link from "next/link"
import "./FilmsList.scss"

type FilmsListType = {
  title: string
  imageUrl: any
  synopsis: string
  score: number
  id: number
}

const FilmsList = ({ title, imageUrl, synopsis, score, id }: FilmsListType) => {
  return (
    <div className="filmsList__body">
      <div className="filmsList__image">
        <Link href={`/films/${id}`}>
          <a>
            <img src={imageUrl} alt="MainScreen" />
          </a>
        </Link>
      </div>
      <div className="filmsList__description-container">
        <div className="filmsList__title">{title}</div>
        <div>{synopsis}</div>
      </div>
      <div className="filmsList__score-container">
        <div className="filmsList__score">{score}</div>
      </div>
    </div>
  )
}

export default FilmsList
