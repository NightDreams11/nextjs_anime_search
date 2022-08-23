import "./index.scss"
import Paginator from "../../componets/base/Paginator/Paginator"
import SearchField from "../../componets/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { initializeStore, useStore } from "../../store/store"
import React, { useEffect, useMemo } from "react"
import FilmsList from "../../componets/FilmsList/FilmsList"
import { useRouter } from "next/router"
import PageSizeSelecter from "../../componets/PageSizeSelecter/PageSizeSelecter"
import { NextPageContext } from "next"
import { Button } from "@mui/material"

const defaultTotalItemsCount = 10
const defaultPageSize = 10
const defaultCurrentPage = 1

const Search = observer(() => {
  const store = useStore()

  const route = useRouter()

  type handleChangeQueryType = {
    page?: string
    perPage?: string
    filmTitle?: string
  }

  const handleChangeQuery = ({
    page,
    perPage,
    filmTitle,
  }: handleChangeQueryType) => {
    route.push({
      query: {
        // Сетаем параметры из URL,
        // прежде чем сетать новые параметры, чтобы не терять предыдущее значение
        ...route.query,
        ...(page ? { page } : {}),
        ...(perPage ? { perPage } : {}),
        ...(filmTitle ? { filmTitle } : {}),
      },
    })
  }

  const handleChangePage = (page: string) => {
    handleChangeQuery({ page })
  }

  const handleChangePageSize = (perPage: string) => {
    handleChangeQuery({ perPage })
  }

  const handleChangeFilmTile = (filmTitle: string | undefined) => {
    handleChangeQuery({ filmTitle })
  }

  const page = useMemo(() => {
    return route.query.page ? Number(route.query.page) : defaultCurrentPage
  }, [route.query])

  const perPage = useMemo(() => {
    return route.query.perPage ? Number(route.query.perPage) : defaultPageSize
  }, [route.query])

  let filmTitle = useMemo(() => {
    return route.query.filmTitle as string
  }, [route.query])

  const resetQueries = () => {
    route.push({})
    filmTitle = ""
  }

  const isQueries = useMemo(() => {
    return route.query.page || route.query.perPage || route.query.filmTitle
  }, [route.query])

  useEffect(() => {
    store.fetchFilms({ page, limit: perPage, q: filmTitle })
  }, [route.query])

  return (
    <div className="search__container">
      <div className="search__searchField">
        <SearchField
          handleChangeFilmTile={handleChangeFilmTile}
          filmName={filmTitle}
        />
        <PageSizeSelecter
          handleChangePageSize={handleChangePageSize}
          perPage={String(perPage)}
        />
        {isQueries && <Button onClick={resetQueries}>Reset</Button>}
      </div>
      <div>
        {store.films.map((film) => {
          return (
            <div key={film.mal_id}>
              <FilmsList
                title={film.title}
                imageUrl={film.images.jpg.image_url}
                synopsis={film.synopsis}
                score={film.score}
                id={film.mal_id}
              />
            </div>
          )
        })}
      </div>
      <div className="search__paginator">
        <Paginator
          totalPagesCount={
            store.pagination.last_visible_page ?? defaultTotalItemsCount
          }
          currentPage={page ?? defaultCurrentPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  )
})

export async function getServerSideProps(context: NextPageContext) {
  const store = initializeStore()
  await store.fetchFilms({
    ...(context.query.page ? { page: Number(context.query.page) } : {}),
    ...(context.query.perPage ? { limit: Number(context.query.perPage) } : {}),
    ...(context.query.q
      ? {
          q: context.query.q as string,
        }
      : {}),
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
