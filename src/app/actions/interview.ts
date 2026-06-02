'use server'

import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getCurrentUser } from './auth'

export async function createInterview(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const role = formData.get('role') as string
  const level = formData.get('level') as string
  const techStack = formData.get('techStack') as string
  // count is optional but nice to have in prompt later
  
  if (!role || !level || !techStack) {
    throw new Error('All fields are required')
  }

  const interview = await prisma.interview.create({
    data: {
      userId: user.id,
      role,
      level,
      techStack,
      status: 'pending'
    }
  })

  redirect(`/interview/${interview.id}`)
}
