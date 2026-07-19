import { Panel } from '@/shared/ui/panel';
import { useLocation } from 'react-router-dom';

type HomePageProps = {
  isEmbedded: boolean;
  basename: string;
};

export function HomePage({ isEmbedded, basename }: HomePageProps) {
  const location = useLocation();
  const activePath = `${location.pathname}${location.search}${location.hash}`;

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">Remote module</h3>
        <p className="text-rmf-muted mt-1 text-sm">
          Module-owned technical surface. Shell owns the{' '}
          <code className="text-rmf-fg">/remote/*</code> namespace; this module
          uses React Router under that basename. Use Overview / Details / About,
          then browser back / forward. Panel colors come from shell CSS tokens
          (--rmf-*).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel
          title="Owner"
          value="Module"
          description="Rendered by runtime-mf-module."
        />
        <Panel
          title="Mode"
          value={isEmbedded ? 'Embedded' : 'Standalone'}
          description={
            isEmbedded
              ? 'Loaded inside the shell remote slot.'
              : 'Running without the shell host.'
          }
        />
        <Panel
          title="Active path"
          value={activePath}
          description="Current path from React Router (relative to basename)."
        />
        <Panel
          title="Basename"
          value={basename || '(none)'}
          description="Route namespace the shell passes into mount()."
        />
        <Panel
          title="Entry"
          value="demo_remote/mount"
          description="Federation expose the shell imports at runtime."
        />
        <Panel
          title="What this proves"
          value="mount()"
          description="Independent build → remoteEntry.js → shell calls mount() with container + bridge."
        />
      </div>

      <div className="rounded-rmf-md border-rmf-border bg-rmf-surface shadow-rmf-sm border p-5">
        <p className="text-rmf-subtle text-sm font-medium">Contract notes</p>
        <ul className="text-rmf-muted mt-3 list-inside list-disc space-y-2 text-sm">
          <li>Shell owns layout, theme toggle, sidebar, and CSS tokens.</li>
          <li>
            Module is loaded via federation and mounted into a host container.
          </li>
          <li>
            Host bridge supplies theme / navigation / auth — paint tokens arrive
            as CSS variables on html[data-rmf-theme].
          </li>
          <li>
            Module routing uses React Router today; wiring through
            bridge.navigation comes next.
          </li>
        </ul>
      </div>
    </section>
  );
}
