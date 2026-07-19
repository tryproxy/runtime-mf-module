import App from '@/app/app';
import { useBridgeLocale } from '@/shared/i18n';
import { useBridgeTheme } from '@/shared/lib';
import type { HostBridge } from './remote-contract';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
  mountRoot?: HTMLElement | null;
};

export function RemoteApp({ bridge, basename, mountRoot }: RemoteAppProps) {
  useBridgeLocale(bridge);
  useBridgeTheme(bridge, mountRoot);

  return <App isEmbedded basename={basename} />;
}
