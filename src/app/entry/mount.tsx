import { createRoot, type Root } from 'react-dom/client';
import { RemoteErrorBoundary } from '@/app/ui/remote-error-boundary';
import '@/shared/i18n';
import '@/app/index.css';
import type { MountRemoteApp } from './remote-contract';
import { RemoteApp } from './remote-app';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);

  root.render(
    <RemoteErrorBoundary>
      <RemoteApp bridge={bridge} basename={basename} mountRoot={container} />
    </RemoteErrorBoundary>
  );

  return {
    unmount() {
      root.unmount();
    },
  };
};

export type {
  AppLocale,
  HostBridge,
  HostTelemetry,
  MountRemoteApp,
  RemoteAppInstance,
  TelemetryProps,
  ThemeMode,
} from './remote-contract';
