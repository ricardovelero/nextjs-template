import { auth, currentUser } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';

function getPrimaryEmailAddress(
  user: Awaited<ReturnType<typeof currentUser>>,
): string {
  const primaryEmail = user?.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
  );

  if (!primaryEmail) {
    throw new Error('Authenticated Clerk user is missing a primary email.');
  }

  return primaryEmail.emailAddress;
}

export async function ensureProfile() {
  await auth.protect();

  const user = await currentUser();

  if (!user) {
    throw new Error('Authenticated Clerk user could not be loaded.');
  }

  const email = getPrimaryEmailAddress(user);

  return prisma.profile.upsert({
    where: {
      clerkUserId: user.id,
    },
    update: {
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
    create: {
      clerkUserId: user.id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      settings: {
        create: {},
      },
    },
    include: {
      settings: true,
    },
  });
}
