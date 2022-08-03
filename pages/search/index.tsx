import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import store from "../../store/store"
import { observer } from "mobx-react-lite"

const Search = observer(() => {
  console.log(store.films)

  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField />
      </div>
      <div className="search__paginator">
        <Paginator />
      </div>
      <button onClick={() => store.fetchFilms()}>Click</button>
    </div>
  )
})

export default Search
