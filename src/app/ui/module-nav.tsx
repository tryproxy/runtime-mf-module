import {
  APP_LOCALES,
  type AppLocale,
  isAppLocale,
  persistLocale,
} from '@/shared/i18n';
import { cn } from '@/shared/lib';
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
                'rounded-rmf-md border px-3 py-1.5 text-sm transition-colors',
                isActive
                  ? 'border-rmf-border bg-rmf-surface text-rmf-fg shadow-rmf-sm'
                  : 'text-rmf-muted hover:text-rmf-fg border-transparent'
              )
            }
          >
            {t(link.labelKey)}
          </NavLink>
        ))}
      </nav>

      {showLocaleSwitch ? (
        <label className="text-rmf-muted flex items-center gap-2 text-sm">
          <span>{t('nav.language')}</span>
          <select
            className="border-rmf-border bg-rmf-surface text-rmf-fg rounded-rmf-md border px-2 py-1"
            value={locale}
            onChange={(event) => {
              const next = event.target.value as AppLocale;
              persistLocale(next);
              void i18n.changeLanguage(next);
            }}
          >
            {APP_LOCALES.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  );
}
