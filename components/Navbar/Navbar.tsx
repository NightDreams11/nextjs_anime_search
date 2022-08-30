import { Button } from "@mui/material"
import FilmDateSelecter from "../FilmDateSelecter/FilmDateSelecter"
import MovieTypeSelector from "../MovieTypeSelecter/MovieTypeSelecter"
import "./Navbar.scss"

type NavbarType = {
  handleChangeFilmType: (type: string) => void
  filmType: string
  handleChangeDate: (date: string) => void
  dateRange: string
  defaultFilmDate: string
  resetQueries: () => void
  isQueries: string | string[] | undefined
}

const Navbar = ({
  handleChangeFilmType,
  filmType,
  handleChangeDate,
  dateRange,
  defaultFilmDate,
  resetQueries,
  isQueries,
}: NavbarType) => {
  return (
    <div className="navbar__body">
      <div className="navbar__selectors-container">
        <div className="navbar__subtitle">Filters:</div>
        <div className="navbar__movieTypeSelecter-container">
          <MovieTypeSelector
            handleChangeFilmType={handleChangeFilmType}
            type={filmType}
          />
        </div>
        <div className="navbar__filmDateSelecter-container">
          <FilmDateSelecter
            handleChangeDate={handleChangeDate}
            date={dateRange ?? defaultFilmDate}
          />
        </div>
        <div className="navbar__resetButton">
          {isQueries && <Button onClick={resetQueries}>Reset</Button>}
        </div>
      </div>
    </div>
  )
}
export default Navbar
