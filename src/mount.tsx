import { createRoot, type Root } from 'react-dom/client';
import { RemoteApp } from './app/remote-app';
import type { MountRemoteApp } from './remote-contract';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);

  root.render(<RemoteApp bridge={bridge} basename={basename} />);

  return {
    unmount() {
      root.unmount();
    },
  };
};
