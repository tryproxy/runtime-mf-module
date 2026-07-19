import {
  APP_LOCALES,
  type AppLocale,
  isAppLocale,
  persistLocale,
} from '@/shared/i18n';
import { cn } from '@/shared/lib';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const links = [
  { to: '/', labelKey: 'nav.overview', end: true },
  { to: '/details', labelKey: 'nav.details', end: false },
  { to: '/about', labelKey: 'nav.about', end: false },
  { to: '/crash', labelKey: 'nav.crash', end: false },
] as const;

type ModuleNavProps = {
  /** Standalone only — when embedded, shell owns the language switch. */
  showLocaleSwitch?: boolean;
};

export function ModuleNav({ showLocaleSwitch = false }: ModuleNavProps) {
  const { t, i18n } = useTranslation();
  const locale: AppLocale = isAppLocale(i18n.language) ? i18n.language : 'en';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav className="flex flex-wrap gap-2" aria-label="Module routes">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            {t(link.labelKey)}
          </NavLink>
        ))}
      </nav>

      {showLocaleSwitch ? (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {t('nav.language')}
          </span>
          <Select
            value={locale}
            onValueChange={(value) => {
              const next = value as AppLocale;
              persistLocale(next);
              void i18n.changeLanguage(next);
            }}
          >
            <SelectTrigger size="sm" aria-label={t('nav.language')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APP_LOCALES.map((code) => (
                <SelectItem key={code} value={code}>
                  {code.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
}
