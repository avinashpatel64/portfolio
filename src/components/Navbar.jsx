import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const routeLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-6 py-5 sm:px-10">
      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="animate-fade-up rounded-full bg-white/40 px-6 py-3 text-xl font-medium tracking-tight text-black backdrop-blur-md"
        >
          Avinash Patel
        </NavLink>

        <nav
          className="animate-fade-up hidden items-center gap-6 rounded-full bg-white/40 px-6 py-3 text-sm tracking-tight text-black backdrop-blur-md sm:flex"
          style={{ animationDelay: '80ms' }}
        >
          {routeLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'font-normal hover:font-semibold'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="animate-fade-up flex size-11 items-center justify-center rounded-full bg-white/40 text-black backdrop-blur-md sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="size-5"
          >
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="mt-3 flex flex-col gap-1 rounded-2xl bg-white/70 p-3 text-base tracking-tight text-black backdrop-blur-md sm:hidden">
          {routeLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 ${isActive ? 'bg-white/60 font-semibold' : 'font-normal'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
