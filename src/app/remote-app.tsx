import App from './app';
import type { HostBridge } from '../remote-contract';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
};

export function RemoteApp({ bridge, basename }: RemoteAppProps) {
  return <App basename={basename} bridge={bridge} />;
}
