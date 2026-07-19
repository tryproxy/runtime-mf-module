import { createRoot, type Root } from 'react-dom/client';
import type { MountRemoteApp } from './remote-contract';
import { RemoteApp } from './ui/remote-app';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);

  root.render(<RemoteApp bridge={bridge} basename={basename} />);

  return {
    unmount() {
      root.unmount();
    },
  };
};
