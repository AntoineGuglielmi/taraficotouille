type HeaderProps = {
  className?: string
  children?: React.ReactNode
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={`py-30 flex flex-col gap-8 items-center justify-center ${className}`}
    >
      <h1 className="typeface-title-main text-white">Taraficotouille</h1>
      <h2 className="text-white text-center max-w-prose font-[600] text-2xl">
        Un dictionnaire qui rassemble tous les mots inventés par Léo
      </h2>
    </header>
  )
}
