'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { updateProfileSettings, updateUserSettings } from '@/features/dashboard/actions/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type SettingsPageProps = {
  profile: {
    email: string
    firstName: string | null
    lastName: string | null
    displayName: string | null
    settings: {
      theme: string | null
      marketingEmails: boolean
      productEmails: boolean
    } | null
  }
}

const themeOptions = [
  {
    value: 'light',
    label: 'Light',
    description: 'Always use the light palette in the dashboard.',
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Always use the dark palette in the dashboard.',
  },
  {
    value: 'system',
    label: 'System',
    description: 'Follow the device preference when a global theme layer is added.',
  },
] as const

export function DashboardSettingsPage({ profile }: SettingsPageProps) {
  const router = useRouter()

  const [displayName, setDisplayName] = useState(profile.displayName ?? '')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
    profile.settings?.theme === 'light' ||
      profile.settings?.theme === 'dark' ||
      profile.settings?.theme === 'system'
      ? profile.settings.theme
      : 'system',
  )
  const [marketingEmails, setMarketingEmails] = useState(
    profile.settings?.marketingEmails ?? false,
  )
  const [productEmails, setProductEmails] = useState(
    profile.settings?.productEmails ?? true,
  )
  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [userSettingsMessage, setUserSettingsMessage] = useState<string | null>(null)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSavingProfile(true)
    setProfileMessage(null)

    startTransition(async () => {
      try {
        const result = await updateProfileSettings({ displayName })
        setProfileMessage(result.message)
        router.refresh()
      } finally {
        setIsSavingProfile(false)
      }
    })
  }

  function handleUserSettingsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSavingSettings(true)
    setUserSettingsMessage(null)

    startTransition(async () => {
      try {
        const result = await updateUserSettings({
          theme,
          marketingEmails,
          productEmails,
        })
        setUserSettingsMessage(result.message)
        router.refresh()
      } finally {
        setIsSavingSettings(false)
      }
    })
  }

  return (
    <section className="flex flex-col gap-8 p-6 md:p-8">
      <header className="max-w-2xl space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Dashboard
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile details and app preferences. Clerk remains the source
            of truth for identity fields such as your primary email and legal name.
          </p>
        </div>
      </header>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="app">User Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={handleProfileSubmit}>
            <div className="space-y-6 border border-border bg-card p-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Keep app-facing profile details here. Your authentication identity is
                  still managed by Clerk.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" description="Synced from Clerk and shown here as read-only.">
                  <Input value={profile.firstName ?? ''} disabled readOnly />
                </Field>
                <Field label="Last name" description="Synced from Clerk and shown here as read-only.">
                  <Input value={profile.lastName ?? ''} disabled readOnly />
                </Field>
              </div>

              <Field label="Email" description="Primary email from Clerk.">
                <Input value={profile.email} disabled readOnly />
              </Field>

              <Field
                label="Display name"
                description="App-owned display name you can use across the dashboard."
              >
                <Input
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Enter a display name"
                />
              </Field>

              <div className="flex items-center gap-3">
                <Button type="submit" size="lg" disabled={isSavingProfile}>
                  {isSavingProfile ? 'Saving...' : 'Save Profile'}
                </Button>
                {profileMessage ? (
                  <p className="text-xs text-muted-foreground">{profileMessage}</p>
                ) : null}
              </div>
            </div>

            <aside className="space-y-4 border border-border bg-muted/30 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Identity Boundary
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  `firstName`, `lastName`, `email`, and avatar are Clerk-owned snapshot
                  fields in this template.
                </p>
                <p>
                  `displayName` is local app data and is safe to extend with bios,
                  timezones, onboarding state, and similar product-facing profile data.
                </p>
              </div>
            </aside>
          </form>
        </TabsContent>

        <TabsContent value="app">
          <form className="grid gap-6 xl:grid-cols-[1fr_0.9fr]" onSubmit={handleUserSettingsSubmit}>
            <div className="space-y-6 border border-border bg-card p-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Appearance</h2>
                <p className="text-sm text-muted-foreground">
                  Theme is saved to your local `UserSettings` record.
                </p>
              </div>

              <fieldset className="grid gap-3">
                <legend className="text-sm font-medium">Theme</legend>
                <div className="grid gap-3 md:grid-cols-3">
                  {themeOptions.map((option) => {
                    const active = theme === option.value

                    return (
                      <label
                        key={option.value}
                        className="flex cursor-pointer flex-col gap-2 border border-border bg-background p-4 text-left transition-colors hover:bg-muted/50 has-[:checked]:border-foreground"
                      >
                        <input
                          className="sr-only"
                          type="radio"
                          name="theme"
                          value={option.value}
                          checked={active}
                          onChange={() => setTheme(option.value)}
                        />
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium">{option.label}</span>
                          <span
                            className={
                              active
                                ? 'size-2 rounded-full bg-foreground'
                                : 'size-2 rounded-full bg-border'
                            }
                          />
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground">
                          {option.description}
                        </p>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            </div>

            <div className="space-y-6 border border-border bg-card p-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  These switches are app-owned and stored in `UserSettings`.
                </p>
              </div>

              <SwitchRow
                title="Marketing emails"
                description="Product announcements, launches, and occasional promotional updates."
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
              <SwitchRow
                title="Product emails"
                description="Important product updates, release notes, and account-related notices."
                checked={productEmails}
                onCheckedChange={setProductEmails}
              />

              <div className="flex items-center gap-3">
                <Button type="submit" size="lg" disabled={isSavingSettings}>
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </Button>
                {userSettingsMessage ? (
                  <p className="text-xs text-muted-foreground">{userSettingsMessage}</p>
                ) : null}
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function Field({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2">
      <div className="space-y-1">
        <span className="text-sm font-medium">{label}</span>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      {children}
    </label>
  )
}

function SwitchRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 border border-border bg-background p-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
