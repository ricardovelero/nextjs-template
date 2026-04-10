'use client'

import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

type DashboardThemeProps = {
  children: React.ReactNode
  theme: 'light' | 'dark' | 'system'
}

export function DashboardTheme({ children, theme }: DashboardThemeProps) {
  const systemPrefersDark = useSyncExternalStore(
    subscribeToColorScheme,
    getColorSchemeSnapshot,
    () => false,
  )
  const resolvedTheme =
    theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme

  return (
    <div
      className={cn(
        'min-h-svh bg-background text-foreground',
        resolvedTheme === 'dark' && 'dark',
      )}
    >
      {children}
    </div>
  )
}

function subscribeToColorScheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', onStoreChange)

  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getColorSchemeSnapshot() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
