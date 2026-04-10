"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  checked,
  ...props
}: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      checked={checked}
      className={cn(
        "group/switch inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-muted px-0.5 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring/50 data-[checked]:bg-primary disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-4.5 rounded-full bg-background shadow-sm transition-transform group-data-[checked]/switch:translate-x-5"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
