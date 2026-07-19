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
        <h3 className="text-lg font-semibold">Remote module</h3>
        <p className="mt-1 text-sm text-slate-600">
          Module-owned technical surface. Mounted by the shell over federation —
          no product UI. Only enough to prove the mount contract and host
          bridge.
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

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Contract notes</p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li>Shell owns layout, theme toggle, and sidebar.</li>
          <li>
            Module is loaded via federation and mounted into a host container.
          </li>
          <li>
            Host bridge supplies theme / navigation / auth — module does not
            import shell internals.
          </li>
        </ul>
      </div>
    </section>
  );
}
