import { Show, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

export default function MainMenu() {
  return (
    <header className='flex justify-end items-center p-4 gap-4 h-16'>
      <Show when='signed-out'>
        <SignInButton mode='modal' />
        <SignUpButton mode='modal'>
          <Button size='lg' className='text-md'>
            Sign Up
          </Button>
        </SignUpButton>
      </Show>
      <Show when='signed-in'>
        <Link href='/dashboard' className={buttonVariants()}>
          Go To Dashboard
        </Link>
      </Show>
    </header>
  );
}
