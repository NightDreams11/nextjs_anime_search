import "./index.scss"
import Paginator from "../../components/base/Paginator/Paginator"
import SearchField from "../../components/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { initializeStore, useStore } from "../../store/store"
import React, { useEffect, useMemo, useState } from "react"
import FilmsList from "../../components/FilmsList/FilmsList"
import { useRouter } from "next/router"
import PageSizeSelecter from "../../components/PageSizeSelecter/PageSizeSelecter"
import { NextPageContext } from "next"
import { Button } from "@mui/material"
import { toJS } from "mobx"
import MovieTypeSelector from "../../components/MovieTypeSelecter/MovieTypeSelecter"
import FilmDateSelecter from "../../components/FilmDateSelecter/FilmDateSelecter"

const defaultTotalItemsCount = 10
const defaultPageSize = 10
const defaultCurrentPage = 1
const defaultFilmDate = "1"

const Search = observer(() => {
  const store = useStore()
  const route = useRouter()

  type handleChangeQueryType = {
    page?: string
    perPage?: string
    filmTitle?: string
    type?: string
    date_range?: string
  }

  const handleChangeQuery = ({
    page,
    perPage,
    filmTitle,
    type,
    date_range,
  }: handleChangeQueryType) => {
    route.push({
      query: {
        // Сетаем параметры из URL,
        // прежде чем сетать новые параметры, чтобы не терять предыдущее значение
        ...route.query,
        ...(page ? { page } : {}),
        ...(perPage ? { perPage } : {}),
        ...(filmTitle ? { filmTitle } : {}),
        ...(type ? { type } : {}),
        ...(date_range ? { date_range } : {}),
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

  const handleChangeFilmType = (type: string) => {
    handleChangeQuery({ type })
  }

  const handleChangeDate = (date: string) => {
    handleChangeQuery({ date_range: date })
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

  let filmType = useMemo(() => {
    return route.query.type as string
  }, [route.query])

  let dateRange = useMemo(() => {
    return route.query.date_range as string
  }, [route.query])

  const resetQueries = () => {
    route.push({})
    filmTitle = ""
  }

  const isQueries = useMemo(() => {
    return (
      route.query.page ||
      route.query.perPage ||
      route.query.filmTitle ||
      route.query.type ||
      route.query.date_range
    )
  }, [route.query])

  useEffect(() => {
    store.fetchFilms({
      page,
      limit: perPage,
      q: filmTitle,
      type: filmType,
      date_range: dateRange,
    })
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
        <MovieTypeSelector
          handleChangeFilmType={handleChangeFilmType}
          type={filmType}
        />
        <FilmDateSelecter
          handleChangeDate={handleChangeDate}
          date={dateRange ?? defaultFilmDate}
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
                type={film.type}
                year={film.year}
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
    ...(context.query.type ? { type: context.query.type as string } : {}),
    ...(context.query.startDate
      ? { date_range: context.query.date_range as string }
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
