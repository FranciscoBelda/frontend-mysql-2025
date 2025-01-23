export interface ApiResponseGames {
  status: boolean
  data: Game[]
}
export interface ApiResponseGame {
  status: boolean
  data: Game
}
export interface ApiResponseMessage {
  status: boolean
  message:string
}

export interface Game {
  id: number
  title: string
  subtitle: string
  favorite: boolean
  description: string
  image: string
  created_at: string
}
