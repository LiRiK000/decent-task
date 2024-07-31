import { renderHook, waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { useFetch } from '../hooks/useFetch'

// Test case: Fetch data successfully
test('fetches data successfully', async () => {
  const mockData = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: true,
  }
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockData),
  })

  const { result } = renderHook(() =>
    useFetch('https://jsonplaceholder.typicode.com/todos/1'),
  )

  await waitFor(() => {
    expect(result.current.data).toEqual(mockData)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  global.fetch = vi.fn()
})

// Test case: Fetch data fails with HTTP error
test('fetches data fails with HTTP error', async () => {
  global.fetch = vi
    .fn()
    .mockRejectedValueOnce(new Error('HTTP error! status: 404'))

  const { result } = renderHook(() => useFetch('https://example.com/api/data'))

  await waitFor(() => {
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('HTTP error! status: 404')
  })

  // Restore fetch
  global.fetch = vi.fn()
})

// Test case: Fetch data fails with network error
test('fetches data fails with network error', async () => {
  global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network Error'))

  const { result } = renderHook(() => useFetch('https://example.com/api/data'))

  await waitFor(() => {
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('Network Error')
  })

  // Restore fetch
  global.fetch = vi.fn()
})

// Test case: Fetch data with invalid URL
test('fetches data with invalid URL', async () => {
  global.fetch = vi.fn().mockRejectedValueOnce(new Error('Invalid URL'))

  const { result } = renderHook(() => useFetch('invalid_url'))

  await waitFor(() => {
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('Invalid URL')
  })
})
// Test case: Fetch data with empty URL
test('fetches data with empty URL', async () => {
  global.fetch = vi.fn().mockImplementation(() => {
    throw new Error('Empty URL')
  })

  const { result } = renderHook(() => useFetch(''))

  await waitFor(() => {
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('Empty URL')
  })

  // Restore fetch
  global.fetch = vi.fn()
})
