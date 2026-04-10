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

export default function BillingPage() {
  return (
    <section className='flex flex-col gap-6 p-6 md:p-8'>
      <header className='flex max-w-2xl flex-col gap-2'>
        <p className='text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground'>
          Dashboard
        </p>
        <h1 className='text-3xl font-semibold tracking-tight'>Billing</h1>
        <p className='text-sm text-muted-foreground'>
          Billing is still a template surface, but it now uses the same shadcn card
          composition as the rest of the app.
        </p>
      </header>

      <div className='grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Plan status</CardTitle>
            <CardDescription>
              Connect your real billing provider here when you are ready to replace the
              starter content.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3 text-muted-foreground'>
            <p>Current plan: Starter</p>
            <p>Seats: 1 active workspace user</p>
            <p>Renewal: Not configured</p>
          </CardContent>
          <CardFooter className='gap-3'>
            <Button variant='outline' render={<Link href='/dashboard/settings' />}>
              Manage Preferences
            </Button>
          </CardFooter>
        </Card>

        <Card size='sm'>
          <CardHeader>
            <CardTitle>Integration notes</CardTitle>
            <CardDescription>
              Stripe, Lemon Squeezy, or your own ledger can slot into this page without
              changing the surrounding UI shell.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3 text-muted-foreground'>
            <p>Swap the placeholder summary with live invoices and payment methods.</p>
            <p>Reuse the existing sidebar and settings patterns to keep the dashboard consistent.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
