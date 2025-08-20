'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/logo'

// Define links in one place
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'Brands' },
  { href: '/categories', label: 'Categories' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Us' },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium hover:underline"
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between mx-auto  px-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <NavLinks />
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button>Get Started</Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription className=" sr-only">Mobile Navigation</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6 px-4">
              <NavLinks onClick={() => setOpen(false)} />
              <Button className="mt-4" onClick={() => setOpen(false)}>
                Get Started
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
