import { useTranslation } from 'react-i18next';

type RemoteErrorFallbackProps = {
  title?: string;
  message?: string | null;
  onRetry?: () => void;
};

export function RemoteErrorFallback({
  title,
  message,
  onRetry,
}: RemoteErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-rmf-md border-rmf-border bg-rmf-surface shadow-rmf-sm border p-5">
      <p className="text-rmf-subtle text-sm font-medium">{t('error.label')}</p>
      <p className="text-rmf-fg mt-3 text-lg font-semibold">
        {title ?? t('error.title')}
      </p>
      <p className="text-rmf-muted mt-2 text-sm">{t('error.description')}</p>
      {message ? (
        <pre className="text-rmf-muted mt-4 max-h-40 overflow-auto text-xs whitespace-pre-wrap">
          {message}
        </pre>
      ) : null}
      {onRetry ? (
        <button
          type="button"
          className="border-rmf-border text-rmf-fg rounded-rmf-md mt-4 border px-3 py-1.5 text-sm"
          onClick={onRetry}
        >
          {t('error.retry')}
        </button>
      ) : null}
    </div>
  );
}
