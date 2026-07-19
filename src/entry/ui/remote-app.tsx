import App from '@/app/app';
import type { HostBridge } from '../remote-contract';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
};

export function RemoteApp({ basename }: RemoteAppProps) {
  return <App isEmbedded basename={basename} />;
}
