'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

/*
 * Black  (#111111) — background fill
 * White  (#eeeeee) — rotating edge sweep
 * Caffeine (#ffe0c2) — hover highlight bloom
 */
const movingMap: Record<Direction, string> = {
  TOP:    'radial-gradient(20.7% 50% at 50% 0%,     #eeeeee 0%, rgba(238,238,238,0) 100%)',
  LEFT:   'radial-gradient(16.6% 43.1% at 0% 50%,   #eeeeee 0%, rgba(238,238,238,0) 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%,   #eeeeee 0%, rgba(238,238,238,0) 100%)',
  RIGHT:  'radial-gradient(16.2% 41.2% at 100% 50%, #eeeeee 0%, rgba(238,238,238,0) 100%)',
}

/* On hover: caffeine bloom */
const highlight =
  'radial-gradient(75% 181.16% at 50% 50%, #ffe0c2 0%, rgba(255,224,194,0) 100%)'

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
} & React.HTMLAttributes<HTMLElement>>) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('BOTTOM')

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    const idx = dirs.indexOf(current)
    return clockwise
      ? dirs[(idx - 1 + dirs.length) % dirs.length]
      : dirs[(idx + 1) % dirs.length]
  }

  useEffect(() => {
    if (hovered) return
    const interval = setInterval(
      () => setDirection((d) => rotateDirection(d)),
      duration * 1000
    )
    return () => clearInterval(interval)
  }, [hovered, duration, clockwise])

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full border border-transparent bg-background/60 p-px backdrop-blur-sm transition duration-500 hover:bg-background/80',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-background px-4 py-2 text-foreground',
          className
        )}
      >
        {children}
      </div>

      {/* Animated border sweep */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)', width: '100%', height: '100%' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />

      {/* Inner fill that creates the "border" illusion */}
      <div className="absolute inset-0.5 z-[1] rounded-[100px] bg-background" />
    </Element>
  )
}
