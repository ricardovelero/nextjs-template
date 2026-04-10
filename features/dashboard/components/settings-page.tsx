'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { updateProfileSettings, updateUserSettings } from '@/features/dashboard/actions/settings'

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

type ThemeValue = (typeof themeOptions)[number]['value']

export function DashboardSettingsPage({ profile }: SettingsPageProps) {
  const router = useRouter()
  const themeLegendId = useId()

  const [displayName, setDisplayName] = useState(profile.displayName ?? '')
  const [theme, setTheme] = useState<ThemeValue>(
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
  const selectedTheme =
    themeOptions.find((option) => option.value === theme) ?? themeOptions[themeOptions.length - 1]

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
      <header className="flex max-w-2xl flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Dashboard
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile details and app preferences. Clerk remains the source
            of truth for identity fields such as your primary email and legal name.
          </p>
        </div>
      </header>

      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="app">User Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={handleProfileSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Keep app-facing profile details here. Your authentication identity is
                  still managed by Clerk.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup className="sm:grid sm:grid-cols-2">
                  <Field data-disabled>
                    <FieldLabel htmlFor="first-name">First name</FieldLabel>
                    <Input id="first-name" value={profile.firstName ?? ''} disabled readOnly />
                    <FieldDescription>
                      Synced from Clerk and shown here as read-only.
                    </FieldDescription>
                  </Field>
                  <Field data-disabled>
                    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                    <Input id="last-name" value={profile.lastName ?? ''} disabled readOnly />
                    <FieldDescription>
                      Synced from Clerk and shown here as read-only.
                    </FieldDescription>
                  </Field>
                  <Field data-disabled className="sm:col-span-2">
                    <FieldLabel htmlFor="email-address">Email</FieldLabel>
                    <Input id="email-address" value={profile.email} disabled readOnly />
                    <FieldDescription>Primary email from Clerk.</FieldDescription>
                  </Field>
                  <Field className="sm:col-span-2">
                    <FieldLabel htmlFor="display-name">Display name</FieldLabel>
                    <Input
                      id="display-name"
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      placeholder="Enter a display name"
                    />
                    <FieldDescription>
                      App-owned display name you can use across the dashboard.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="gap-3">
                <Button type="submit" size="lg" disabled={isSavingProfile}>
                  {isSavingProfile ? 'Saving profile...' : 'Save Profile'}
                </Button>
                {profileMessage ? (
                  <p className="text-xs text-muted-foreground">{profileMessage}</p>
                ) : null}
              </CardFooter>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>Identity Boundary</CardTitle>
                <CardDescription>
                  Decide which profile fields stay in Clerk and which ones remain product-owned.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-muted-foreground">
                <p>
                  `firstName`, `lastName`, `email`, and avatar are Clerk-owned snapshot
                  fields in this template.
                </p>
                <p>
                  `displayName` is local app data and is safe to extend with bios,
                  timezones, onboarding state, and similar product-facing profile data.
                </p>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="app">
          <form className="grid gap-6 xl:grid-cols-[1fr_0.9fr]" onSubmit={handleUserSettingsSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Theme preferences are stored in your local `UserSettings` record.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldSet>
                  <FieldLegend id={themeLegendId} variant="label">
                    Theme
                  </FieldLegend>
                  <FieldDescription>
                    Choose how the dashboard resolves light and dark mode.
                  </FieldDescription>
                  <ToggleGroup
                    aria-labelledby={themeLegendId}
                    className="flex-wrap"
                    spacing={2}
                    value={[theme]}
                    variant="outline"
                    onValueChange={(value) => {
                      const nextTheme = value[0]

                      if (
                        nextTheme === 'light' ||
                        nextTheme === 'dark' ||
                        nextTheme === 'system'
                      ) {
                        setTheme(nextTheme)
                      }
                    }}
                  >
                    {themeOptions.map((option) => (
                      <ToggleGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <FieldDescription>{selectedTheme.description}</FieldDescription>
                </FieldSet>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  These switches are app-owned and stored in `UserSettings`.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldSet>
                  <FieldLegend variant="label">Email preferences</FieldLegend>
                  <FieldDescription>
                    Choose which product updates should reach your inbox.
                  </FieldDescription>
                  <FieldGroup className="gap-4">
                    <Field
                      orientation="horizontal"
                      className="items-start rounded-none border border-border p-4"
                    >
                      <FieldContent className="gap-1 pr-6">
                        <FieldLabel htmlFor="marketing-emails">Marketing emails</FieldLabel>
                        <FieldDescription>
                          Product announcements, launches, and occasional promotional updates.
                        </FieldDescription>
                      </FieldContent>
                      <Switch
                        id="marketing-emails"
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </Field>
                    <Field
                      orientation="horizontal"
                      className="items-start rounded-none border border-border p-4"
                    >
                      <FieldContent className="gap-1 pr-6">
                        <FieldLabel htmlFor="product-emails">Product emails</FieldLabel>
                        <FieldDescription>
                          Important product updates, release notes, and account-related notices.
                        </FieldDescription>
                      </FieldContent>
                      <Switch
                        id="product-emails"
                        checked={productEmails}
                        onCheckedChange={setProductEmails}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
              <CardFooter className="gap-3">
                <Button type="submit" size="lg" disabled={isSavingSettings}>
                  {isSavingSettings ? 'Saving settings...' : 'Save Settings'}
                </Button>
                {userSettingsMessage ? (
                  <p className="text-xs text-muted-foreground">{userSettingsMessage}</p>
                ) : null}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </section>
  )
}
