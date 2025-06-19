import { defineStore } from "pinia"

type TypeMovie = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
}

type TypeMovieSearch = {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

const top5MoviesIds = [
  'tt27995114', // Dept. Q
  'tt31710249', // Stick
  'tt9603208', // Mission: Impossible - The Final Reckoning
  'tt11655566', // Lilo & Stitch
  'tt32260680' // The Better Sister
]
const baseURL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_KEY}`
const STORAGE_NAME = 'MyRatedMovies'

export const useMovieStore = defineStore('movie', {
  state: () => {
    return {
      topRatedMovies: [] as TypeMovie[],
      searchedList: [] as TypeMovieSearch[],
      searchedListError: '',
      showMovieModal: false,
      currentMovie: {} as TypeMovie,
      movieModalLoader: false,
    }
  },
  actions: {
    async getTopRatedMovies() {
      if (this.topRatedMovies.length) {
        return null
      }
      const storage: string | null = window.localStorage.getItem(STORAGE_NAME)
      const storedMovies: [] = storage && JSON.parse(storage)
      if (storedMovies?.length) {
        storedMovies.map(item => this.topRatedMovies.push(item))
        return null
      }
      try {
        top5MoviesIds.map(async id => {
          const response = await fetch(`${baseURL}&i=${id}`)
          const data = await response.json()
          this.topRatedMovies.push(data)
        })
      } catch (error) {
        
      } finally {
        window.localStorage.setItem(STORAGE_NAME, JSON.stringify(this.topRatedMovies))
      }
    },
    async getMoviesByString(value: string | undefined) {
      if (!value || value.length < 3) return null
      try {
        const response = await fetch(`${baseURL}&s=${value}`)
        const data = await response.json()
        this.searchedListError = ''
        if (!data.Search) {
          this.searchedListError = data.Error
          return null
        }
        this.searchedList = []
        data.Search.map((item: TypeMovieSearch) => this.searchedList.push(item))
      } catch (error) {
        
      } finally {

      }
    },
    async getMovieById(id: string) {
      try {
        const response = await fetch(`${baseURL}&i=${id}`)
        const data = await response.json()
        return data
      } catch (error) {
        
      }
    },
    async toggleMovieModal(movie: TypeMovie | TypeMovieSearch | null) {
      this.showMovieModal = !this.showMovieModal
      if (movie) {
        try {
          this.movieModalLoader = true
          this.currentMovie = await this.getMovieById(movie.imdbID) 
        } finally {
          this.movieModalLoader = false
        }
      }
    },
    resetSearch() {
      this.searchedList = []
      this.searchedListError = ''
    }
  }
})