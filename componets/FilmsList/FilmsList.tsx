import "./FilmsList.scss"

type FilmsListType = {
  title: string
  imageUrl: any
  synopsis: string
  score: number
}

const FilmsList = ({ title, imageUrl, synopsis, score }: FilmsListType) => {
  return (
    <div className="filmsList__body">
      <div className="filmsList__image">
        <img src={imageUrl} alt="MainScreen" />
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
