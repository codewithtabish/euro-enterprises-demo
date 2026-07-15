"use client"

import * as React from "react"
import Link from "next/link"
import { Building2Icon } from "lucide-react"

export function BrandLogo() {
  const [displayText, setDisplayText] = React.useState("")
  const fullText = "EURO ENTERPRISES"
  const [isTypingComplete, setIsTypingComplete] = React.useState(false)

  React.useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <Link href="/" className="flex items-center gap-3 w-full group">
      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] group-hover:scale-110">
        <Building2Icon className="size-5 text-primary animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold tracking-tight text-foreground">
          {displayText}
          {!isTypingComplete && (
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-blink align-middle" />
          )}
        </span>
        {isTypingComplete && (
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium animate-fade-in">
            Premium Rentals
          </span>
        )}
      </div>
    </Link>
  )
}