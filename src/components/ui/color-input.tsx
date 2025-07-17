"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the text input with the new hex value from the color picker
      onChange({
        ...e,
        target: {
          ...e.target,
          value: e.target.value.replace(/^#/, ""), // Remove # for consistency
        },
      })
    }

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Ensure the value is a valid hex string (without #)
      const newValue = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6)
      onChange({
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      })
    }

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-sm text-muted-foreground">#</span>
        <Input
          ref={ref}
          value={value}
          onChange={handleTextInputChange}
          maxLength={6}
          placeholder="RRGGBB"
          className="flex-1"
          {...props}
        />
        <input
          type="color"
          value={`#${value}`}
          onChange={handleColorChange}
          className="h-9 w-9 cursor-pointer rounded-md border border-input bg-background p-1"
          style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
        />
      </div>
    )
  },
)
ColorInput.displayName = "ColorInput"

export { ColorInput }
