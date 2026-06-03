'use server'

import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getCurrentUser } from './auth'

export async function createInterview(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "User not logged in" }
    }

    const role = formData.get('role') as string
    const level = formData.get('level') as string
    const techStack = formData.get('techStack') as string
    
    if (!role || !level || !techStack) {
      return { error: 'All fields are required' }
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

    return { success: true, interviewId: interview.id }
  } catch (error: any) {
    console.error("Error creating interview:", error)
    return { error: error.message || "Failed to create interview" }
  }
}
