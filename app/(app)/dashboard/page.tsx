import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ensureProfile } from '@/lib/profile';

export default async function DashboardPage() {
  const profile = await ensureProfile();
  const displayName =
    profile.displayName?.trim() ||
    [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim() ||
    profile.email;

  return (
    <section className='flex flex-col gap-6 p-6 md:p-8'>
      <header className='flex max-w-2xl flex-col gap-2'>
        <p className='text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground'>
          Dashboard
        </p>
        <h1 className='text-3xl font-semibold tracking-tight'>Welcome back, {displayName}</h1>
        <p className='text-sm text-muted-foreground'>
          This workspace is wired with Clerk identity, Prisma-backed profile state, and
          shadcn base components.
        </p>
      </header>

      <div className='grid gap-4 xl:grid-cols-[1.35fr_1fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Profile overview</CardTitle>
            <CardDescription>
              Keep identity in Clerk and app-specific settings inside your local profile record.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 sm:grid-cols-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-muted-foreground'>Email</p>
              <p>{profile.email}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-muted-foreground'>Display name</p>
              <p>{profile.displayName?.trim() || 'Not set yet'}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-muted-foreground'>Theme</p>
              <p>{profile.settings?.theme ?? 'system'}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-muted-foreground'>Notifications</p>
              <p>
                {profile.settings?.marketingEmails ? 'Marketing on' : 'Marketing off'} /{' '}
                {profile.settings?.productEmails ? 'Product on' : 'Product off'}
              </p>
            </div>
          </CardContent>
          <CardFooter className='gap-3'>
            <Button render={<Link href='/dashboard/settings' />}>Open Settings</Button>
            <Button variant='outline' render={<Link href='/dashboard/billing' />}>
              Review Billing
            </Button>
          </CardFooter>
        </Card>

        <Card size='sm'>
          <CardHeader>
            <CardTitle>Template status</CardTitle>
            <CardDescription>
              The starter now uses the same shadcn primitives across navigation, settings,
              and page-level surfaces.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3 text-muted-foreground'>
            <p>Base style: `base-lyra`.</p>
            <p>Routing: Next.js App Router with React Server Components enabled.</p>
            <p>Icons: Remix Icon, matching the current shadcn project config.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
