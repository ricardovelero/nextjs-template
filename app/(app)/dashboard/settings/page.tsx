import { DashboardSettingsPage } from '@/features/dashboard/components/settings-page';
import { ensureProfile } from '@/lib/profile';

export default async function SettingsPage() {
  const profile = await ensureProfile();

  return (
    <DashboardSettingsPage
      profile={{
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        displayName: profile.displayName,
        settings: profile.settings
          ? {
              theme: profile.settings.theme,
              marketingEmails: profile.settings.marketingEmails,
              productEmails: profile.settings.productEmails,
            }
          : null,
      }}
    />
  );
}
