import { action, makeAutoObservable, observable } from "mobx"

class Store {
  @observable films = []

  constructor() {
    makeAutoObservable(this, {}, { deep: true })
  }

  @action fetchFilms() {
    fetch("https://api.jikan.moe/v4/anime")
      .then((response) => response.json())
      .then((film) => {
        this.films = film
      })
  }
}

export default new Store()
