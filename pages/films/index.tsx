import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { initializeStore, useStore } from "../../store/store"
import React, { useEffect, useMemo } from "react"
import Link from "next/link"
import FilmsList from "../../componets/FilmsList/FilmsList"
import { useRouter } from "next/router"
import PageSizeSelecter from "../../componets/PageSizeSelecter/PageSizeSelecter"
import { toJS } from "mobx"
import { NextPageContext } from "next"

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

  const route = useRouter()

  type handleChangeQueryType = {
    search?: string
    page?: string
    perPage?: string
  }

  const handleChangeQuery = ({
    search,
    page,
    perPage,
  }: handleChangeQueryType) => {
    route.push({
      query: {
        // Сетаем параметры из URL,
        // прежде чем сетать новые параметры, чтобы не терять предыдущее значение
        ...route.query,
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(perPage ? { perPage } : {}),
      },
    })
  }

  const handleChangePage = (page: string) => {
    handleChangeQuery({ page })
  }

  const handleChangePageSize = (perPage: string) => {
    handleChangeQuery({ perPage })
  }

  const page = useMemo(() => {
    return !!Number(route.query.page)
      ? Number(route.query.page)
      : defaultCurrentPage
  }, [route.query])

  const perPage = useMemo(() => {
    return !!Number(route.query.perPage)
      ? Number(route.query.perPage)
      : defaultPageSize
  }, [route.query])

  // console.log(route.query)

  useEffect(() => {
    store.fetchFilms({ page, limit: perPage })
  }, [route.query])

  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField />
        <PageSizeSelecter
          handleChangePageSize={handleChangePageSize}
          perPage={String(perPage)}
        />
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
          pageSize={perPage ?? defaultPageSize}
          currentPage={page ?? defaultCurrentPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  )
})

export async function getServerSideProps(context: NextPageContext) {
  // console.log("context", context)

  const store = initializeStore()
  await store.fetchFilms({
    page: Number(context.query.page),
    limit: Number(context.query.perPage),
  })

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
