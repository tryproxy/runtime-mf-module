import { Panel } from '@/shared/ui/panel';
import { useLocation } from 'react-router-dom';

type AboutPageProps = {
  basename: string;
};

export function AboutPage({ basename }: AboutPageProps) {
  const location = useLocation();
  const activePath = `${location.pathname}${location.search}${location.hash}`;

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-rmf-fg text-lg font-semibold">About</h3>
        <p className="text-rmf-muted mt-1 text-sm">
          Another module-owned React Router route. Same mount session as
          Overview and Details — only the module view should change.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel
          title="Route"
          value="/about"
          description="Third path for the history experiment."
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
          title="Ownership"
          value="React Router"
          description="Shell owns /remote/* namespace; module owns routes under basename."
        />
      </div>
    </section>
  );
}
