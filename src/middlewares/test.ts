/* eslint-disable @typescript-eslint/no-unused-vars */
import { createEntry } from '@/services/ServiceEntries'
import { NextRequest, NextResponse } from 'next/server'

export async function testMiddleware(request: NextRequest) {
  console.log('middleware')
  //   await createEntry({
  //     title: 'test',
  //   })
  return NextResponse.next()
}
