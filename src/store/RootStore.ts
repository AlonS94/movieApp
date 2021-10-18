import { MovieStore } from './MovieStore'

export class RootStore {
  public readonly movieStore: MovieStore

  constructor() {
    this.movieStore = new MovieStore()
  }
}
