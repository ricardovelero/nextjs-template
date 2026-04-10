import Link from 'next/link'
import { RiArrowRightLine, RiDatabase2Line, RiShieldCheckLine, RiSparklingLine } from '@remixicon/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <section className="flex flex-col gap-10 px-4 py-10 md:px-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Next.js Template
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A real shadcn base app, not a default scaffold.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              This starter combines Next.js 16, Clerk auth, Prisma persistence, and
              shadcn base components so the marketing shell and dashboard share the same
              UI language from day one.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/dashboard" />}>
              Open dashboard
              <RiArrowRightLine data-icon="inline-end" />
            </Button>
            <Button variant="outline" render={<Link href="/dashboard/settings" />}>
              Inspect settings
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What ships in the box</CardTitle>
            <CardDescription>
              The starter is already aligned around the installed shadcn primitives.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <RiSparklingLine className="mt-0.5 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <p className="font-medium">Base-lyra styling</p>
                <p className="text-muted-foreground">
                  Uses the project&apos;s configured shadcn style, icon library, and
                  Tailwind v4 tokens.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <RiShieldCheckLine className="mt-0.5 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <p className="font-medium">Clerk identity boundary</p>
                <p className="text-muted-foreground">
                  Authentication stays external while app-owned preferences remain local.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <RiDatabase2Line className="mt-0.5 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <p className="font-medium">Prisma-backed profile state</p>
                <p className="text-muted-foreground">
                  Template records are ready for product settings, billing state, and
                  onboarding flags.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>
              Uses the installed shadcn `navigation-menu` instead of bespoke header markup.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Dashboard shell</CardTitle>
            <CardDescription>
              Uses the shadcn sidebar layout and page-level card composition.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Settings forms</CardTitle>
            <CardDescription>
              Uses `Field`, `FieldSet`, and `ToggleGroup` instead of hand-rolled form wrappers.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
