import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Show, SignInButton, SignUpButton } from '@clerk/nextjs';
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiIndeterminateCircleFill,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className='flex flex-col gap-1 text-sm'>
              <div className='leading-none font-medium'>{title}</div>
              <div className='line-clamp-2 text-muted-foreground'>
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

export default function MainMenu() {
  return (
    <header className='flex h-16 items-center justify-between gap-4 border-b px-4'>
      <Link href='/'>
        <Image src='/next.svg' alt='Next.js Logo' width={100} height={76} />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='w-96'>
                <ListItem href='/docs' title='Introduction'>
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className='hidden md:flex'>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150'>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-50 gap-1'>
                <li>
                  <NavigationMenuLink
                    render={
                      <Link href='#' className='flex-row items-center gap-2'>
                        <RiErrorWarningLine />
                        Backlog
                      </Link>
                    }
                  />
                </li>
                <li>
                  <NavigationMenuLink
                    render={
                      <Link href='#' className='flex-row items-center gap-2'>
                        <RiIndeterminateCircleFill />
                        To Do
                      </Link>
                    }
                  />
                </li>
                <li>
                  <NavigationMenuLink
                    render={
                      <Link href='#' className='flex-row items-center gap-2'>
                        <RiCheckboxCircleLine />
                        Done
                      </Link>
                    }
                  />
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href='/docs'>Docs</Link>}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex gap-4 '>
        <Show when='signed-out'>
          <SignInButton mode='modal'>
            <Button variant='ghost' size='lg'>Sign In</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button size='lg'>Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when='signed-in'>
          <Button nativeButton={false} render={<Link href='/dashboard' />}>
            Go To Dashboard
          </Button>
        </Show>
      </div>
    </header>
  );
}
