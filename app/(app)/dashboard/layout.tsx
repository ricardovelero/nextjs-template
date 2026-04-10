import { ensureProfile } from '@/lib/profile';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/dashboard/components/app-sidebar';
import { DashboardTheme } from '@/features/dashboard/components/dashboard-theme';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await ensureProfile();
  const theme =
    profile.settings?.theme === 'light' ||
    profile.settings?.theme === 'dark' ||
    profile.settings?.theme === 'system'
      ? profile.settings.theme
      : 'system';

  return (
    <DashboardTheme theme={theme}>
      <SidebarProvider>
        <AppSidebar
          user={{
            email: profile.email,
            imageUrl: profile.imageUrl,
            name:
              profile.displayName?.trim() ||
              [profile.firstName, profile.lastName]
                .filter(Boolean)
                .join(' ')
                .trim() ||
              null,
          }}
        />
        <SidebarInset>
          <header className='flex h-12 items-center gap-3 border-b px-4'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='h-4' />
            <p className='text-xs text-muted-foreground'>Workspace</p>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </DashboardTheme>
  );
}
