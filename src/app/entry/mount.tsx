import { createRoot, type Root } from 'react-dom/client';
import { RemoteErrorBoundary } from '@/app/ui/remote-error-boundary';
import '@/shared/i18n';
import '@/app/styles/index.css';
import type { MountRemoteApp } from '@platform/runtime-mf-contract';
import { RemoteApp } from './remote-app';

export const mount: MountRemoteApp = ({ container, bridge, basename }) => {
  const root: Root = createRoot(container);
  let disposed = false;
  let resolveReady: () => void = () => undefined;
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });

  const markReady = () => {
    if (!disposed) {
      resolveReady();
    }
  };

  try {
    root.render(
      <RemoteErrorBoundary>
        <RemoteApp
          bridge={bridge}
          basename={basename}
          mountRoot={container}
          onReady={markReady}
        />
      </RemoteErrorBoundary>
    );
  } catch (error) {
    disposed = true;
    resolveReady();

    const reportCleanupFailure = (cleanupError: unknown) => {
      try {
        bridge.telemetry.captureException(cleanupError, {
          lifecycleStage: 'partial_cleanup',
        });
      } catch {
        // Preserve the original mount failure.
      }
    };

    try {
      root.unmount();
    } catch (cleanupError) {
      reportCleanupFailure(cleanupError);
    }

    try {
      container.replaceChildren();
    } catch (cleanupError) {
      reportCleanupFailure(cleanupError);
    }

    throw error;
  }

  return {
    ready,
    unmount() {
      if (disposed) {
        return;
      }

      disposed = true;
      resolveReady();

      try {
        root.unmount();
      } finally {
        container.replaceChildren();
      }
    },
  };
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
