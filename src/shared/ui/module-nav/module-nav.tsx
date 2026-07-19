import { cn } from '@/shared/lib/cn';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Overview', end: true },
  { to: '/details', label: 'Details', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/crash', label: 'Crash test', end: false },
] as const;

export function ModuleNav() {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Module routes">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            cn(
              'rounded-rmf-md border px-3 py-1.5 text-sm transition-colors',
              isActive
                ? 'border-rmf-border bg-rmf-surface text-rmf-fg shadow-rmf-sm'
                : 'text-rmf-muted hover:text-rmf-fg border-transparent'
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
