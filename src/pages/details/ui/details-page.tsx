import { Panel } from '@/shared/ui/panel';
import { useLocation } from 'react-router-dom';

type DetailsPageProps = {
  basename: string;
};

export function DetailsPage({ basename }: DetailsPageProps) {
  const location = useLocation();
  const activePath = `${location.pathname}${location.search}${location.hash}`;

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">Details</h3>
        <p className="text-rmf-muted mt-1 text-sm">
          Module-owned React Router route under the shell basename. Use browser
          back / forward after Overview → Details → About.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel
          title="Route"
          value="/details"
          description="Interpreted by the module React Router, not the shell."
        />
        <Panel
          title="Active path"
          value={activePath}
          description="Current path from React Router (relative to basename)."
        />
        <Panel
          title="Basename"
          value={basename || '(none)'}
          description="Namespace the shell passed into mount()."
        />
        <Panel
          title="History check"
          value="back / forward"
          description="Shell must keep RemoteSlot mounted for /remote/*."
        />
      </div>
    </section>
  );
}
