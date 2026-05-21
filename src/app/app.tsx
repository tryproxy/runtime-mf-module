import { cn } from '@/shared/lib/cn';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { useSyncExternalStore } from 'react';
import type { HostBridge, ThemeMode } from '../remote-contract';

type PageKey = 'main' | 'product';

const pages = {
  main: {
    path: '',
    label: 'Main',
    title: 'Main Page',
    description: 'Bare-bones landing page for quick layout checks.',
    bgClassName: 'bg-sky-200',
  },
  product: {
    path: '/product',
    label: 'Product',
    title: 'Product Page',
    description:
      'Simple product placeholder with a different background color.',
    bgClassName: 'bg-emerald-200',
  },
} satisfies Record<
  PageKey,
  {
    path: string;
    label: string;
    title: string;
    description: string;
    bgClassName: string;
  }
>;

type AppProps = {
  basename?: string;
  bridge?: HostBridge;
};

function getPageFromLocation({
  pathname,
  hash,
  basename,
  bridge,
}: {
  pathname: string;
  hash: string;
  basename: string;
  bridge?: HostBridge;
}): PageKey {
  if (bridge) {
    return pathname === `${basename}/product` ? 'product' : 'main';
  }

  return hash === '#/product' ? 'product' : 'main';
}

function App({ basename = '', bridge }: AppProps) {
  const themeMode = useRemoteTheme(bridge);
  const getCurrentPage = useCallback(
    () =>
      getPageFromLocation({
        pathname: window.location.pathname,
        hash: window.location.hash,
        basename,
        bridge,
      }),
    [basename, bridge]
  );

  const [page, setPage] = useState<PageKey>(() => getCurrentPage());

  const navigationItems = useMemo(
    () =>
      (Object.entries(pages) as [PageKey, (typeof pages)[PageKey]][]).map(
        ([key, item]) => ({
          key,
          ...item,
          href: bridge
            ? `${basename}${item.path}` || basename
            : `#${item.path || '/'}`,
        })
      ),
    [basename, bridge]
  );

  useEffect(() => {
    const syncPage = () => {
      setPage(getCurrentPage());
    };

    const eventName = bridge ? 'popstate' : 'hashchange';

    window.addEventListener(eventName, syncPage);

    return () => {
      window.removeEventListener(eventName, syncPage);
    };
  }, [bridge, getCurrentPage]);

  const currentPage = pages[page];

  const handleNavigate =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!bridge) {
        return;
      }

      event.preventDefault();
      bridge.navigation.navigate(href);
    };

  return (
    <div
      className={cn(
        'min-h-screen transition-colors',
        themeMode === 'dark'
          ? 'bg-slate-900 text-slate-100'
          : cn('text-slate-900', currentPage.bgClassName)
      )}
    >
      <header
        className={cn(
          'border-b transition-colors',
          themeMode === 'dark'
            ? 'border-slate-700 bg-slate-950/80'
            : 'border-slate-900/10 bg-white/70'
        )}
      >
        <div className="mx-auto flex max-w-4xl gap-3 px-6 py-4">
          {navigationItems.map(({ key, href, label }) => (
            <a
              key={key}
              href={href}
              className={cn(
                'rounded border px-3 py-2 text-sm font-medium',
                page === key
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : themeMode === 'dark'
                    ? 'border-slate-700 bg-slate-800 text-slate-100'
                    : 'border-slate-400 bg-white text-slate-900'
              )}
              onClick={handleNavigate(href)}
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-10">
        <h1 className="text-3xl font-semibold">{currentPage.title}</h1>
        <p className="max-w-xl text-base">{currentPage.description}</p>

        {page === 'main' ? (
          <section
            className={cn(
              'rounded border p-4',
              themeMode === 'dark'
                ? 'border-slate-700 bg-slate-800/80'
                : 'border-slate-900/15 bg-white/70'
            )}
          >
            <div className="text-sm font-medium">Status</div>
            <div className="mt-2 text-sm">This is the main page.</div>
          </section>
        ) : (
          <section
            className={cn(
              'rounded border p-4',
              themeMode === 'dark'
                ? 'border-slate-700 bg-slate-800/80'
                : 'border-slate-900/15 bg-white/70'
            )}
          >
            <div className="text-sm font-medium">Product</div>
            <div className="mt-2 text-sm">Product name: Whatever</div>
            <div className="mt-1 text-sm">Price: $10</div>
          </section>
        )}
      </main>
    </div>
  );
}

function useRemoteTheme(bridge?: HostBridge): ThemeMode {
  return useSyncExternalStore(
    bridge?.theme.subscribe ?? (() => () => undefined),
    () => bridge?.theme.getSnapshot().mode ?? 'light',
    () => 'light'
  );
}

export default App;
