/* eslint-disable @typescript-eslint/no-unused-vars */
import InviteUserEmailTemplate from '@/components/molecules/invite-user-email-template'
import { getAvailableUsers } from '@/services/ServiceUsers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const { RESEND_API_KEY, RESEND_VERIFIED_DOMAIN } = process.env

export async function GET(req: Request) {
  const resend = new Resend(RESEND_API_KEY)

  try {
    const availableUsers = (await getAvailableUsers()) || []
    if (!availableUsers.length) {
      return NextResponse.json({
        message: 'Aucun nouvel utilisateur à inviter.',
      })
    }
    const promises = []
    for (const { email, $id: id } of availableUsers) {
      promises.push(
        resend.emails.send({
          from: `Taraficotouille <${RESEND_VERIFIED_DOMAIN}>`,
          to: email,
          subject: `Création d'un nouvel utilisateur`,
          react: InviteUserEmailTemplate({ id }),
        }),
      )
    }
    await Promise.all(promises)
    return NextResponse.json({
      message: 'Tous les nouveaux utilisateurs ont été invités.',
    })
  } catch {
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
