type InviteUserEmailTemplateProps = {
  className?: string
  id: string
}

export default function InviteUserEmailTemplate({
  className,
  id,
}: InviteUserEmailTemplateProps) {
  return (
    <div className={` ${className}`}>
      <p>
        Clique sur <a href={`http://localhost:3000/adminify/${id}`}>ce lien</a>{' '}
        pour pouvoir inventer des mots toi aussi :)
      </p>
    </div>
  )
}
