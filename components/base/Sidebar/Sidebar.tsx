import { Button } from "@mui/material"
import FilmDateSelector from "../../films/FilmDateSelector/FilmDateSelector"
import FilmTypeSelector from "../../films/FilmTypeSelector/FilmTypeSelector"
import "./Sidebar.scss"

type SidebarPropsType = {
  handleChangeFilmType: (type: string) => void
  filmType: string | undefined
  handleChangeDate: (date: string) => void
  dateRange: string | undefined
  defaultFilmDate: string
  resetFiltersQueries: () => void
  filtersQueries: string | string[] | undefined
}

const Sidebar = ({
  handleChangeFilmType,
  filmType,
  handleChangeDate,
  dateRange,
  defaultFilmDate,
  resetFiltersQueries,
  filtersQueries,
}: SidebarPropsType) => {
  return (
    <div className="navbar__body">
      <div className="navbar__selectors-container">
        <div className="navbar__subtitle">Filters:</div>
        <div className="navbar__movieTypeSelecter-container">
          <FilmTypeSelector
            handleChangeFilmType={handleChangeFilmType}
            type={filmType}
          />
        </div>
        <div className="navbar__filmDateSelecter-container">
          <FilmDateSelector
            handleChangeDate={handleChangeDate}
            date={dateRange ?? defaultFilmDate}
          />
        </div>
        <div className="navbar__resetButton">
          {filtersQueries && (
            <Button onClick={resetFiltersQueries}>Reset</Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Sidebar
