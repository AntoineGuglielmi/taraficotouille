'use client'

type AdminNavProps = {
  className?: string
}

export default function AdminNav({ className }: AdminNavProps) {
  const handleAddUser = async () => {
    const test = await fetch('/api/adminify').then((res) => res.json())
    console.log({
      test,
    })
  }

  return (
    <nav className={`pt-16 ${className}`}>
      <ul className="flex items-center justify-center">
        <li>
          <button
            className="button-primary"
            onClick={handleAddUser}
          >
            Ajouter les utilisateurs
          </button>
        </li>
      </ul>
    </nav>
  )
}
