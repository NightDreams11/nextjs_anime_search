import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { IFilm, initializeStore, useStore } from "../../store/store"
import React, { useEffect } from "react"
import { toJS } from "mobx"

type Props = {
  initialState: {
    films: IFilm
  }
}

const Search = observer(() => {
  const store = useStore()
  useEffect(() => {
    store.fetchFilms()
  }, [])

  console.log(toJS(store))
  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField />
      </div>
      <div className="search__paginator">
        <Paginator />
      </div>
      <div>
        {store.films.map((film) => {
          return <div key={film.mal_id}>{film.background}</div>
        })}
      </div>
    </div>
  )
})

export async function getServerSideProps(context: any) {
  const store = initializeStore()
  await store.fetchFilms()

  return {
    props: {
      initialState: {
        films: store.films,
        pagination: store.pagination,
      },
    },
  }
}

export default Search
