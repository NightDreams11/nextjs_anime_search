import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { fetchFilms, IFilm, initializeStore, useStore } from "../../store/store"
import { toJS } from "mobx"
import React from "react"

type SearchType = {
  films: IFilm
}

const Search = observer((props) => {
  console.log(props)

  // console.log(toJS(store.films))

  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField />
      </div>
      <div className="search__paginator">
        <Paginator />
      </div>
      <div>
        {/* {Object.values(films).map((film) => {
          return <div key={film.mal_id}>{film.background}</div>
        })} */}
      </div>
    </div>
  )
})

export async function getServerSideProps() {
  const store = initializeStore()
  await store.fetchFilms()

  return {
    props: { initialState: { films: store.films } },
  }
}

export default Search
