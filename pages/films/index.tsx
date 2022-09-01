import "./index.scss"
import Paginator from "../../components/base/Paginator/Paginator"
import SearchField from "../../components/base/SearchField/SearchField"
import { observer } from "mobx-react-lite"
import { initializeStore, useStore } from "../../store/store"
import React, { useEffect, useMemo } from "react"
import { useRouter } from "next/router"
import PageSizeSelector from "../../components/base/PageSizeSelector/PageSizeSelector"
import { NextPageContext } from "next"
import { toJS } from "mobx"
import FilmsOrderBySelector from "../../components/films/FilmsOrderBySelector/FilmsOrderBySelector"
import SortDirectionToggler from "../../components/base/SortDirectionToggler/SortDirectionToggler"
import Sidebar from "../../components/base/Sidebar/Sidebar"
import Header from "../../components/base/Header/Header"
import FilmCard from "../../components/films/FilmCard/FilmCard"

const defaultTotalItemsCount = 10
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
    order_by?: string
    sort?: string
  }

  const handleChangeQuery = ({
    page,
    perPage,
    filmTitle,
    type,
    date_range,
    order_by,
    sort,
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
        ...(order_by ? { order_by } : {}),
        ...(sort ? { sort } : {}),
      },
    })
  }

  const handleChangePage = (page: string) => {
    handleChangeQuery({ page })
  }

  const handleChangePageSize = (perPage: string) => {
    handleChangeQuery({ perPage })
  }

  const handleChangeSearch = (value: string | undefined) => {
    handleChangeQuery({ filmTitle: value })
  }

  const handleChangeFilmType = (type: string) => {
    handleChangeQuery({ type })
  }

  const handleChangeDate = (date: string) => {
    handleChangeQuery({ date_range: date })
  }

  const handleChangeOrderBy = (param: string) => {
    handleChangeQuery({ order_by: param })
  }

  const handleSortDirectionToggler = (sortParam: string) => {
    handleChangeQuery({ sort: sortParam })
  }

  const page = useMemo(() => {
    return route.query.page ? Number(route.query.page) : defaultCurrentPage
  }, [route.query])

  const perPage = useMemo(() => {
    return route.query.perPage ? Number(route.query.perPage) : undefined
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

  let filmParam = useMemo(() => {
    return route.query.order_by as string
  }, [route.query])

  let sortDiraction = useMemo(() => {
    return route.query.sort as string
  }, [route.query])

  const resetFiltersQueries = () => {
    const params = { ...route.query }
    delete params.page
    delete params.perPage
    delete params.type
    delete params.date_range

    route.push({
      query: {
        ...params,
      },
    })
  }

  const resetSearchParams = () => {
    const params = { ...route.query }
    delete params.order_by
    delete params.sort
    delete params.filmTitle

    route.push({
      query: {
        ...params,
      },
    })
  }

  const searchQueries = useMemo(() => {
    return route.query.filmTitle || route.query.order_by || route.query.sort
  }, [route.query])

  const filtersQueries = useMemo(() => {
    return (
      route.query.page ||
      route.query.perPage ||
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
      order_by: filmParam,
      sort: sortDiraction,
    })
  }, [route.query])

  return (
    <div className="search">
      <Header
        Search={
          <SearchField
            handleChangeSearch={handleChangeSearch}
            filmName={filmTitle ?? ""}
          />
        }
        Sort={
          <FilmsOrderBySelector
            handleChangeOrderBy={handleChangeOrderBy}
            param={filmParam}
          />
        }
        Direction={
          <SortDirectionToggler
            handleSortDirectionToggler={handleSortDirectionToggler}
            sortDiraction={sortDiraction}
            filmParam={filmParam}
          />
        }
        resetSearchParams={resetSearchParams}
        searchQueries={searchQueries}
        title={"Anime"}
      />

      <div className="search__wrapper">
        <div className="search__navbar-container">
          <Sidebar
            handleChangeFilmType={handleChangeFilmType}
            handleChangeDate={handleChangeDate}
            filmType={filmType}
            dateRange={dateRange}
            defaultFilmDate={defaultFilmDate}
            resetFiltersQueries={resetFiltersQueries}
            filtersQueries={filtersQueries}
          />
        </div>
        <div className="search__container">
          <div className="search__filmList">
            {store.films.map((film) => {
              return (
                <div key={film.mal_id}>
                  <FilmCard
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
            <div className="search__PageSizeSelector-container">
              <PageSizeSelector
                handleChangePageSize={handleChangePageSize}
                perPage={perPage ?? undefined}
              />
            </div>
          </div>
        </div>
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
    ...(context.query.order_by
      ? { order_by: context.query.order_by as string }
      : {}),
    ...(context.query.sort ? { sort: context.query.sort as string } : {}),
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
