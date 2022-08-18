import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { initializeStore, useStore } from "../../store/store"
import React from "react"
import Link from "next/link"
import FilmsList from "../../componets/FilmsList/FilmsList"

// type Props = {
//   initialState: {
//     films: IFilm
//   }
// }

const defaultTotalItemsCount = 10
const defaultPageSize = 10
const defaultCurrentPage = 1

const Search = observer(() => {
  const store = useStore()

  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField />
      </div>
      <div>
        {store.films.map((film) => {
          return (
            <div key={film.mal_id}>
              <Link href={`/films/${film.mal_id}`}>
                <a>
                  <FilmsList
                    title={film.title}
                    imageUrl={film.images.jpg.image_url}
                    synopsis={film.synopsis}
                    score={film.score}
                  />
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="search__paginator">
        <Paginator
          totalPagesCount={
            store.pagination.last_visible_page ?? defaultTotalItemsCount
          }
          pageSize={store.pagination.items?.per_page ?? defaultPageSize}
          currentPage={store.pagination.current_page ?? defaultCurrentPage}
        />
      </div>
    </div>
  )
})

export async function getServerSideProps(context: any) {
  const store = initializeStore()
  await store.fetchFilms({})

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
