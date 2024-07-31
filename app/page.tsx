'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFetch } from '@/hooks/useFetch'
import { Country } from '@/types'

export default function Home() {
  const { data } = useFetch<Country[]>('https://restcountries.com/v3.1/all')
  const router = useRouter()

  const handleRowClick = (countryName: string) => {
    router.push(`/country/${countryName.toLowerCase()}`)
  }

  return (
    <Table>
      <TableCaption>A list of countries</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Capital</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead className="text-right">Population</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((country) => (
          <TableRow
            key={country.name.common}
            className="cursor-pointer hover:bg-gray-100 text-xl"
            onClick={() => handleRowClick(country.name.common)}
          >
            <TableCell className="font-medium">{country.name.common}</TableCell>
            <TableCell>{country.capital}</TableCell>
            <TableCell>
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                width={40}
                height={40}
              />
            </TableCell>
            <TableCell className="text-right">
              {country.population.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
