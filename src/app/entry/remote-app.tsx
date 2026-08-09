import App from '@/app/app';
import { useBridgeLocale } from '@/shared/i18n';
import { HostBridgeProvider, useBridgeTheme } from '@/shared/lib';
import type { HostBridge } from '@platform/runtime-mf-contract';
import { useEffect } from 'react';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
  mountRoot?: HTMLElement | null;
  onReady(): void;
};

export function RemoteApp({
  bridge,
  basename,
  mountRoot,
  onReady,
}: RemoteAppProps) {
  useBridgeLocale(bridge);
  useBridgeTheme(bridge, mountRoot);

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <HostBridgeProvider value={bridge}>
      <App isEmbedded basename={basename} />
    </HostBridgeProvider>
  );
}
