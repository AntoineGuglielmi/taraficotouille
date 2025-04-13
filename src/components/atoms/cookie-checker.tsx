import { cookies } from 'next/headers'

type CookieCheckerProps = {
  className?: string
  children?: React.ReactNode
  showIf?: Array<string>
  hideIf?: Array<string>
}

export default async function CookieChecker({
  //   className,
  children,
  showIf = [],
  hideIf = [],
}: CookieCheckerProps) {
  const cookiesStore = await cookies()
  const user = cookiesStore.get('TARAFICOTOUILLE_USER')?.value || ''
  return <>{showIf?.includes(user) && !hideIf?.includes(user) && children}</>
}
