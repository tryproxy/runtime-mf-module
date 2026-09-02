import {
  navPagePath,
  remoteNavManifest,
  type RemoteNavPageId,
} from '@/app/model/nav-manifest';
import { ModuleNav } from '@/app/ui/module-nav';
import { ProtectedMeButton } from '@/app/ui/protected-me-button';
import { AboutPage } from '@/pages/about';
import { CrashPage } from '@/pages/crash';
import { DetailsPage } from '@/pages/details';
import { FormPage } from '@/pages/form';
import { HomePage } from '@/pages/home';
import { HostBridgeProvider } from '@/shared/lib';
import { DemoToastProvider } from '@/shared/ui/demo-toast';
import { TooltipProvider } from '@/shared/ui/shadcn';
import { createMockHostBridge } from '@platform/runtime-mf-contract';
import type { ReactElement } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

type AppProps = {
  basename?: string;
  isEmbedded?: boolean;
};

function pageElement(
  pageId: RemoteNavPageId,
  isEmbedded: boolean,
  basename: string
): ReactElement {
  switch (pageId) {
    case 'overview':
      return <HomePage isEmbedded={isEmbedded} basename={basename} />;
    case 'details':
      return <DetailsPage basename={basename} />;
    case 'about':
      return <AboutPage basename={basename} />;
    case 'form':
      return <FormPage basename={basename} />;
    case 'crash':
      return <CrashPage />;
  }
}

function AppRoutes({
  isEmbedded,
  basename,
}: {
  isEmbedded: boolean;
  basename: string;
}) {
  return (
    <TooltipProvider>
      <DemoToastProvider>
        <section className="flex min-w-0 flex-col gap-6 overflow-x-auto p-px">
          {!isEmbedded ? <ModuleNav showLocaleSwitch /> : null}

          <ProtectedMeButton />

          <Routes>
            {remoteNavManifest.pages.map((page) => (
              <Route
                key={page.id}
                path={navPagePath(page.segment)}
                element={pageElement(page.id, isEmbedded, basename)}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </section>
      </DemoToastProvider>
    </TooltipProvider>
  );
}

function App({ basename = '', isEmbedded = false }: AppProps) {
  const effectiveBasename = isEmbedded ? basename || '/remote' : '';

  if (isEmbedded) {
    return (
      <BrowserRouter basename={effectiveBasename}>
        <AppRoutes isEmbedded basename={effectiveBasename} />
      </BrowserRouter>
    );
  }

  const mockBridge = createMockHostBridge({ theme: 'dark', locale: 'en' });

  return (
    <HostBridgeProvider value={mockBridge}>
      <HashRouter>
        <AppRoutes isEmbedded={false} basename={effectiveBasename} />
      </HashRouter>
    </HostBridgeProvider>
  );
}

export default App;
