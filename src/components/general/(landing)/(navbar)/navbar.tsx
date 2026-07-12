'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ModeToggle } from '../../(themes)/theme-toggler'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '#', hasDropdown: true },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Teams', href: '/teams' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

const carSubmenu = [
    { name: 'Rentals', href: '#rentals' },
    { name: 'Sales', href: '#sales' },
]

const APPNavBar = () => {
    const [menuState, setMenuState] = useState(false)
    const [carsOpen, setCarsOpen] = useState(false)

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full border-b border-dashed bg-white/95 backdrop-blur-md md:relative dark:bg-zinc-950/95 lg:dark:bg-transparent">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-center justify-between gap-6 py-2 lg:py-3">
                        {/* Left - Logo */}
                        <div className="shrink-0">
                            <Link href="/" className="flex items-center">
                                <Logo />
                            </Link>
                        </div>

                        {/* Center - Desktop Navigation */}
                        <div className="hidden lg:flex items-center justify-center flex-1 gap-8">
                            {menuItems.map((item, index) => (
                                <div key={index} className="relative group">
                                    {item.hasDropdown ? (
                                        <div
                                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer py-2"
                                            onClick={() => setCarsOpen(!carsOpen)}
                                        >
                                            {item.name}
                                            <ChevronDown className={`size-4 transition-transform ${carsOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground font-medium transition-colors py-2">
                                            {item.name}
                                        </Link>
                                    )}

                                    {/* Cars Dropdown */}
                                    {item.hasDropdown && carsOpen && (
                                        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl bg-white dark:bg-zinc-900 border shadow-xl py-2 z-50">
                                            {carSubmenu.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={sub.href}
                                                    className="block px-6 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                                    onClick={() => setCarsOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right - Actions */}
                        <div className="flex items-center flex-row-reverse md:flex-row shrink-0">
                            <ModeToggle />
                            <Button className={'  cursor-pointer rounded-xl md:block hidden'}  >
                               LOGIN
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                            <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                            <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden bg-background in-data-[state=active]:block hidden w-full border-t px-6 py-8 shadow-xl shadow-zinc-300/10 dark:shadow-none">
                    <ul className="space-y-6 text-base">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.hasDropdown ? (
                                    <>
                                        <div className="font-medium py-2">Cars</div>
                                        <div className="pl-6 space-y-4 mt-2">
                                            {carSubmenu.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={sub.href}
                                                    className="block text-muted-foreground hover:text-foreground"
                                                    onClick={() => setMenuState(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-muted-foreground hover:text-foreground block font-medium transition-colors duration-150 py-2"
                                        onClick={() => setMenuState(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                </div>
            </nav>
        </header>
    )
}

export default APPNavBar