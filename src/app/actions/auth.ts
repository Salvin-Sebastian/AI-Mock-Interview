'use server'

import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function loginAsGuest() {
  const user = await prisma.user.create({
    data: {
      isGuest: true,
      name: 'Guest User'
    }
  })
  
  const cookieStore = await cookies()
  cookieStore.set('session_userid', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/dashboard')
}

// Replaced simple email login with Firebase Sync
export async function syncFirebaseUser(uid: string, email: string | null, name: string | null) {
  if (!email) {
    return { error: 'Email is required from Firebase' }
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: uid, // Use Firebase UID
          email,
          name: name || email.split('@')[0],
          isGuest: false
        }
      })
    }

    const cookieStore = await cookies()
    cookieStore.set('session_userid', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return { success: true }
  } catch (error: any) {
    console.error("Error in syncFirebaseUser:", error);
    return { error: error.message || "Failed to sync user with database." }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session_userid')
  redirect('/login')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('session_userid')?.value
  
  if (!userId) return null
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  
  return user
}
