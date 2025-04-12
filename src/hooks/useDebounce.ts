import { useState, useEffect } from 'react'

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup : annuler le délai si la valeur change avant la fin
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
