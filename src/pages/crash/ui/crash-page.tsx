import { useState } from 'react';

export function CrashPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('PoC crash: intentional module render error');
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">Crash test</h3>
        <p className="text-rmf-muted mt-1 text-sm">
          Click the button to throw during render. The module Error Boundary
          should replace this view; shell chrome should stay. Retry clears the
          boundary.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShouldCrash(true)}
        className="rounded-rmf-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm text-red-700"
      >
        Crash module render
      </button>
    </section>
  );
}
