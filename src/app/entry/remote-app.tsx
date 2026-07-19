import App from '@/app/app';
import { useBridgeLocale } from '@/shared/i18n';
import type { HostBridge } from './remote-contract';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
};

export function RemoteApp({ bridge, basename }: RemoteAppProps) {
  useBridgeLocale(bridge);

  return <App isEmbedded basename={basename} />;
}
