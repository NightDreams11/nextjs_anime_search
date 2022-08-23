import { action, makeAutoObservable, observable } from "mobx"
import { createContext, useContext } from "react"

export interface IFilm {
  approved: boolean
  mal_id: number
  background: string
  raiting: string
  score: number
  status: string
  synopsis: string
  title: string
  year: number
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
    web: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
}
export interface IPagination {
  current_page?: number
  last_visible_page?: number
  has_next_page?: boolean
  items?: {
    count: number
    total: number
    per_page: number
  }
}

interface ApiResponse<T> {
  data: T
  pagination: any
  links: any
  metadata: any
}

type FetchFilmsType = {
  page?: number
  limit?: number
  q?: string
}

interface IStore {
  films: IFilm[]
  pagination: IPagination
  fetchFilms: ({ page, limit }: FetchFilmsType) => void
}

interface IinitializeStore {
  films: IFilm[]
  pagination: IPagination
}

let store: Store

export function initializeStore(initialData?: IinitializeStore): Store {
  const _store = store ?? new Store()

  if (initialData) {
    _store.hydrate(initialData)
  }

  if (typeof window === "undefined") return _store

  if (!store) store = _store

  return _store
}

class Store implements IStore {
  constructor() {
    makeAutoObservable(this, {}, { deep: true })
  }

  @observable films = [] as Array<IFilm>
  @observable pagination: IPagination = {}

  @action async fetchFilms({ page = 1, limit = 10, q }: FetchFilmsType) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(q ? { q } : {}),
    })

    return fetch(`https://api.jikan.moe/v4/anime?${params.toString()}`)
      .then((response) => {
        return response.json() as Promise<ApiResponse<IFilm[]>>
      })
      .then((film) => {
        this.films = film.data
        this.pagination = film.pagination
      })
  }

  @action hydrate(data: IinitializeStore) {
    if (data) {
      this.films = data.films
      this.pagination = data.pagination
    }
  }
}

export const StoreContext = createContext<Store>(initializeStore())
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider")
  }

  return context
}

export function StoreProvider({
  children,
  initialState: initialData,
}: {
  children: React.ReactNode
  initialState: IinitializeStore
}) {
  const store = initializeStore(initialData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
