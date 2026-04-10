import { ensureProfile } from '@/lib/profile';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </DashboardTheme>
  );
}
