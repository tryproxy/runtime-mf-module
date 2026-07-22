import { createRoot, type Root } from 'react-dom/client';
import { RemoteErrorBoundary } from '@/app/ui/remote-error-boundary';
import '@/shared/i18n';
import '@/app/styles/index.css';
import type { MountRemoteApp } from '@platform/runtime-mf-contract';
import { RemoteApp } from './remote-app';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);

  root.render(
    <RemoteErrorBoundary>
      <RemoteApp bridge={bridge} basename={basename} mountRoot={container} />
    </RemoteErrorBoundary>
  );

  return {
    ready: Promise.resolve(),
    unmount() {
      root.unmount();
    },
  } as ReturnType<MountRemoteApp>;
};

/** Re-export contract types from the federation entry (shell may import them). */
export type {
  AppLocale,
  HostBridge,
  HostTelemetry,
  MountRemoteApp,
  RemoteAppInstance,
  TelemetryProps,
  ThemeMode,
} from '@platform/runtime-mf-contract';
