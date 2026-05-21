import type { HostBridge } from '../remote-contract';

type RemoteAppProps = {
  bridge: HostBridge;
  basename: string;
};

export function RemoteApp({ bridge, basename }: RemoteAppProps) {
  const theme = bridge.theme.getSnapshot();
  const session = bridge.auth.getSession();
  const location = bridge.navigation.getLocation();

  return (
    <main style={{ padding: 24 }}>
      <h1>Runtime MF Demo Remote</h1>

      <pre>
        {JSON.stringify(
          {
            basename,
            theme,
            session,
            location,
          },
          null,
          2
        )}
      </pre>

      <button
        type="button"
        onClick={() => bridge.navigation.navigate('/demo/details')}
      >
        Navigate to /demo/details
      </button>
    </main>
  );
}
