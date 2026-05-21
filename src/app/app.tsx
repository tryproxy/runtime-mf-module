import { cn } from '@/shared/lib/cn';
import { useEffect, useState } from 'react';

type PageKey = 'main' | 'product';

const pages = {
  main: {
    href: '#/',
    label: 'Main',
    title: 'Main Page',
    description: 'Bare-bones landing page for quick layout checks.',
    bgClassName: 'bg-sky-200',
  },
  product: {
    href: '#/product',
    label: 'Product',
    title: 'Product Page',
    description:
      'Simple product placeholder with a different background color.',
    bgClassName: 'bg-emerald-200',
  },
} satisfies Record<
  PageKey,
  {
    href: string;
    label: string;
    title: string;
    description: string;
    bgClassName: string;
  }
>;

function getPageFromHash(hash: string): PageKey {
  return hash === '#/product' ? 'product' : 'main';
}

function App() {
  const [page, setPage] = useState<PageKey>(() =>
    getPageFromHash(window.location.hash)
  );

  useEffect(() => {
    const syncPage = () => {
      setPage(getPageFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', syncPage);

    return () => {
      window.removeEventListener('hashchange', syncPage);
    };
  }, []);

  const currentPage = pages[page];

  return (
    <div className={cn('min-h-screen text-slate-900', currentPage.bgClassName)}>
      <header className="border-b border-slate-900/10 bg-white/70">
        <div className="mx-auto flex max-w-4xl gap-3 px-6 py-4">
          {(Object.entries(pages) as [PageKey, (typeof pages)[PageKey]][]).map(
            ([key, item]) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  'rounded border px-3 py-2 text-sm font-medium',
                  page === key
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-400 bg-white text-slate-900'
                )}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-10">
        <h1 className="text-3xl font-semibold">{currentPage.title}</h1>
        <p className="max-w-xl text-base">{currentPage.description}</p>

        {page === 'main' ? (
          <section className="rounded border border-slate-900/15 bg-white/70 p-4">
            <div className="text-sm font-medium">Status</div>
            <div className="mt-2 text-sm">This is the main page.</div>
          </section>
        ) : (
          <section className="rounded border border-slate-900/15 bg-white/70 p-4">
            <div className="text-sm font-medium">Product</div>
            <div className="mt-2 text-sm">Product name: Whatever</div>
            <div className="mt-1 text-sm">Price: $10</div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
