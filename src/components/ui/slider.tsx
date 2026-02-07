"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SliderProps = {
  className?: string
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

function Slider({
  className,
  defaultValue = [25, 50],
  value,
  min = 0,
  max = 100,
  step = 5,
  onValueChange,
}: SliderProps) {
  const [internal, setInternal] = React.useState(value ?? defaultValue)
  const v = value ?? internal
  const low = Math.min(v[0] ?? min, v[1] ?? max)
  const high = Math.max(v[0] ?? min, v[1] ?? max)

  const set = (next: number[]) => {
    if (value == null) setInternal(next)
    onValueChange?.(next)
  }

  const pct = (n: number) => ((n - min) / (max - min)) * 100

  const inputClass =
    "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:block [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm"

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <div className="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full">
        <div
          className="bg-primary absolute h-full rounded-full"
          style={{ left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(e) => set([Number(e.target.value), high])}
        className={inputClass}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(e) => set([low, Number(e.target.value)])}
        className={inputClass}
      />
    </div>
  )
}

export { Slider }
