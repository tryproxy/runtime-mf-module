import { createRoot, type Root } from 'react-dom/client';
import type { MountRemoteApp } from './remote-contract';
import { RemoteErrorBoundary } from './ui/remote-error-boundary';
import { RemoteApp } from './ui/remote-app';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);

  root.render(
    <RemoteErrorBoundary>
      <RemoteApp bridge={bridge} basename={basename} />
    </RemoteErrorBoundary>
  );

  return {
    unmount() {
      root.unmount();
    },
  };
};
