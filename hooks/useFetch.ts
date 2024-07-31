import { useEffect, useState } from 'react'

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    if (!url) {
      setLoading(false)
      setError(new Error('Empty URL'))
      return
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: T) => {
        setLoading(false)
        console.log(data)
        setData(data)
      })
      .catch((error: Error) => {
        setError(error)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
