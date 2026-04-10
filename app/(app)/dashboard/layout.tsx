import { ensureProfile } from '@/lib/profile';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/dashboard/components/app-sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureProfile();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
