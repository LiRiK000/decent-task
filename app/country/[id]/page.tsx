// app/country/[id]/page.tsx

'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useFetch } from '@/hooks/useFetch'
import { Country } from '@/types'

export default function CountryPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { data, error, loading } = useFetch<Country[]>(
    `https://restcountries.com/v3.1/name/${id}`,
  )
  console.log(`https://restcountries.com/v3.1/name/${id}`)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const country = data?.[0]

  if (!country) return <p>Country not found</p>

  return (
    <section className="p-4 w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{country.name.common}</h1>
      <p className="text-lg">Capital: {country.capital}</p>
      <p className="text-lg">
        Population: {country.population.toLocaleString()}
      </p>
      <p className="text-lg">Region: {country.region}</p>
      <p className="text-lg">Subregion: {country.subregion}</p>
      <div className="border-2 border-black mt-4">
        <Image
          src={country.flags.svg}
          alt={country.name.common}
          width={100}
          height={60}
        />
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </section>
  )
}
