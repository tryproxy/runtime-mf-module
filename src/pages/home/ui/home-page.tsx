import { Panel } from '@/shared/ui/panel';

type HomePageProps = {
  isEmbedded: boolean;
  activePath: string;
  basename: string;
};

export function HomePage({ isEmbedded, activePath, basename }: HomePageProps) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">Remote module</h3>
        <p className="text-rmf-muted mt-1 text-sm">
          Module-owned technical surface. Mounted by the shell over federation —
          no product UI. Only enough to prove the mount contract and host
          bridge. Panel colors come from shell CSS tokens (--rmf-*).
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
          description="Current URL owned under the remote basename."
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
        </ul>
      </div>
    </section>
  );
}
