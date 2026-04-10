'use client';

import { useClerk } from '@clerk/nextjs';
import {
  RiBankCardLine,
  RiDashboardLine,
  RiExpandUpDownLine,
  RiFlashlightLine,
  RiLogoutBoxRLine,
  RiSettings3Line,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type AppSidebarProps = {
  user: {
    email: string;
    imageUrl: string | null;
    name: string | null;
  };
};

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='gap-0'>
        <Link
          href='/dashboard'
          className={cn(
            'flex h-12 items-center px-2 text-sidebar-foreground transition-colors hover:text-sidebar-accent-foreground',
            isCollapsed ? 'justify-center' : 'justify-start',
          )}
        >
          {isCollapsed ? (
            <Image src='/globe.svg' alt='Template icon' width={20} height={20} />
          ) : (
            <Image src='/next.svg' alt='Template logo' width={90} height={20} />
          )}
        </Link>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href='/dashboard' />}
                isActive={pathname === '/dashboard'}
                tooltip='Dashboard'
              >
                <RiDashboardLine />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href='/dashboard/billing' />}
                isActive={pathname === '/dashboard/billing'}
                tooltip='Billing'
              >
                <RiBankCardLine />
                <span>Billing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href='/dashboard/settings' />}
                isActive={pathname === '/dashboard/settings'}
                tooltip='Settings'
              >
                <RiSettings3Line />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AccountMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

function AccountMenu({ user }: AppSidebarProps) {
  const { signOut } = useClerk();
  const { isMobile, state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === 'collapsed';
  const fallbackName = user.name?.trim() || user.email.split('@')[0];

  return (
    <DropdownMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                tooltip='Account'
                className='min-w-0 data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground'
              />
            }
          >
            <span className='flex min-w-0 items-center gap-2'>
              <UserAvatar imageUrl={user.imageUrl} name={fallbackName} />
              {!isCollapsed ? (
                <span className='min-w-0 text-left'>
                  <span className='block truncate text-xs font-medium'>
                    {fallbackName}
                  </span>
                  <span className='block truncate text-xs text-sidebar-foreground/70'>
                    {user.email}
                  </span>
                </span>
              ) : null}
            </span>
            {!isCollapsed ? (
              <RiExpandUpDownLine className='ml-auto shrink-0' />
            ) : null}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--anchor-width) min-w-56 rounded-none'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-3 px-2 py-1.5 text-left text-xs'>
                  <UserAvatar imageUrl={user.imageUrl} name={fallbackName} large />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-medium'>{fallbackName}</p>
                    <p className='truncate text-xs text-muted-foreground'>
                      {user.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <RiFlashlightLine />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                render={<Link href='/dashboard/settings' />}
                className={cn(pathname === '/dashboard/settings' && 'bg-accent')}
              >
                <RiSettings3Line />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={async () => {
                  await signOut({ redirectUrl: '/' });
                }}
              >
                <RiLogoutBoxRLine />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </SidebarMenuItem>
      </SidebarMenu>
    </DropdownMenu>
  );
}

function UserAvatar({
  imageUrl,
  name,
  large = false,
}: {
  imageUrl: string | null;
  name: string;
  large?: boolean;
}) {
  const sizeClass = large ? 'size-10' : 'size-7';

  return (
    <Avatar className={sizeClass}>
      {imageUrl ? <AvatarImage src={imageUrl} alt={name} /> : null}
      <AvatarFallback
        className={cn(
          'bg-sidebar-primary font-semibold text-sidebar-primary-foreground',
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
