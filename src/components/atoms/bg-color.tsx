'use client'

import {
  // useEffect,
  useState,
} from 'react'
import { useWindowScroll } from 'react-use'
import clsx from 'clsx'

type BgColorProps = {
  className?: string
  children?: React.ReactNode
}

export default function BgColor({ className }: BgColorProps) {
  const { y } = useWindowScroll()
  const [
    bgClass,
    // setBgClass
  ] = useState('bg-amber-500')

  const bgPosition = `center ${-y / 3 - 20}px` // effet parallax

  //   useEffect(() => {
  //     if (y > 500) setBgClass('bg-blue-200')
  //     else if (y > 200) setBgClass('bg-green-100')
  //     else setBgClass('bg-amber-500')
  //   }, [y])

  return (
    <div
      style={{
        backgroundPosition: bgPosition,
      }}
      className={clsx(
        'absolute inset-0 -z-10 bg-[url("/bg/bg-kid-space.svg")] bg-size-[300px] bg-repeat transition-colors duration-1000',
        bgClass,
        className,
      )}
    />
  )
}
