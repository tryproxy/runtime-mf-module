import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function CrashPage() {
  const { t } = useTranslation();
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('PoC crash: intentional module render error');
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">
          {t('crash.title')}
        </h3>
        <p className="text-rmf-muted mt-1 text-sm">{t('crash.description')}</p>
      </div>

      <button
        type="button"
        onClick={() => setShouldCrash(true)}
        className="rounded-rmf-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm text-red-700"
      >
        {t('crash.button')}
      </button>
    </section>
  );
}
