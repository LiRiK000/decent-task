export interface Country {
  name: {
    common: string
  }
  region: string
  subregion: string
  flags: {
    svg: string
  }
  capital: string
  population: number
}
