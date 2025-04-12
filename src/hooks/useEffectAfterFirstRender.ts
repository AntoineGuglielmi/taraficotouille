/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

export default function useEffectAfterFirstRender(
  effect: () => void | (() => void),
  deps: any[],
) {
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    return effect()
  }, deps)
}
