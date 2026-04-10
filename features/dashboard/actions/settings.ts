'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

type SaveResult = {
  message: string
}

export async function updateProfileSettings(input: {
  displayName: string
}): Promise<SaveResult> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await prisma.profile.update({
    where: {
      clerkUserId: userId,
    },
    data: {
      displayName: input.displayName.trim() || null,
    },
  })

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard', 'layout')

  return { message: 'Profile settings saved.' }
}

export async function updateUserSettings(input: {
  theme: 'light' | 'dark' | 'system'
  marketingEmails: boolean
  productEmails: boolean
}): Promise<SaveResult> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId: userId,
    },
    select: {
      id: true,
    },
  })

  if (!profile) {
    throw new Error('Profile not found')
  }

  await prisma.userSettings.upsert({
    where: {
      profileId: profile.id,
    },
    update: {
      theme: input.theme,
      marketingEmails: input.marketingEmails,
      productEmails: input.productEmails,
    },
    create: {
      profileId: profile.id,
      theme: input.theme,
      marketingEmails: input.marketingEmails,
      productEmails: input.productEmails,
    },
  })

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard', 'layout')

  return { message: 'App settings saved.' }
}
