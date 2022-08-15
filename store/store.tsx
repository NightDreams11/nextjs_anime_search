import { action, makeAutoObservable, observable } from "mobx"

export interface IFilm {
  approved: boolean
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

interface ApiResponse<T> {
  data: T
  pagination: any
  links: any
  metadata: any
}

export const fetchFilms = async () => {
  return await fetch("https://api.jikan.moe/v4/anime")
    .then((response) => {
      return response.json() as Promise<ApiResponse<IFilm[]>>
    })
    .then((film) => {
      return film.data
    })
}

interface IStore {
  films: IFilm[]
  fetchFilms: () => void
}

export function initializeStore(initialData: any = null) {
  const store = new Store()

  if (initialData) {
    store.hydrate(initialData)
  }

  return store
}

class Store implements IStore {
  constructor() {
    makeAutoObservable(this, {}, { deep: true })
  }

  @observable films = [] as Array<IFilm>

  @action async fetchFilms() {
    return fetch("https://api.jikan.moe/v4/anime")
      .then((response) => {
        return response.json() as Promise<ApiResponse<IFilm[]>>
      })
      .then((film) => {
        return (this.films = film.data)
      })
  }

  @action setFilms(films: Array<IFilm>) {
    this.films = films
  }

  @action hydrate(data: any) {
    if (data) {
      this.films = data
    }
  }
}

export const useStore = (initialState: any) => {
  const store = initializeStore(initialState)
  return store
}
