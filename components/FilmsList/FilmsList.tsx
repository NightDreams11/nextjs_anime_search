import Link from "next/link"
import "./FilmsList.scss"

type FilmsListType = {
  title: string
  imageUrl: any
  synopsis: string
  score: number
  id: number
  type: string
  year: number
}

const FilmsList = ({
  title,
  imageUrl,
  synopsis,
  score,
  id,
  type,
  year,
}: FilmsListType) => {
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
        <div className="filmsList__score-container">
          {score && (
            <div className="filmsList__score">
              Raiting: <span>{score}</span>
            </div>
          )}
          {year && (
            <div className="filmList__aired">
              Aired: <span>{year}</span>
            </div>
          )}
          {type && (
            <div className="filmList__type">
              Type: <span>{type}</span>
            </div>
          )}
        </div>
        <div>{synopsis}</div>
      </div>
    </div>
  )
}

export default FilmsList
