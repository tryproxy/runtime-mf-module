import { AboutPage } from '@/pages/about';
import { CrashPage } from '@/pages/crash';
import { DetailsPage } from '@/pages/details';
import { FormPage } from '@/pages/form';
import { HomePage } from '@/pages/home';
import { ModuleNav } from '@/app/ui/module-nav';
import { ProtectedMeButton } from '@/app/ui/protected-me-button';
import { HostBridgeProvider } from '@/shared/lib/host-bridge-context';
import { Toaster, TooltipProvider } from '@/shared/ui/shadcn';
import { createMockHostBridge } from '@platform/runtime-mf-contract';
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

function AppRoutes({
  isEmbedded,
  basename,
}: {
  isEmbedded: boolean;
  basename: string;
}) {
  return (
    <TooltipProvider>
      <section className="min-w-0 space-y-6 overflow-x-auto">
        {!isEmbedded ? <ModuleNav showLocaleSwitch /> : null}

        <ProtectedMeButton />

        <Routes>
          <Route
            path="/"
            element={<HomePage isEmbedded={isEmbedded} basename={basename} />}
          />
          <Route
            path="/details"
            element={<DetailsPage basename={basename} />}
          />
          <Route path="/about" element={<AboutPage basename={basename} />} />
          <Route path="/form" element={<FormPage basename={basename} />} />
          <Route path="/crash" element={<CrashPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>

        <Toaster richColors closeButton position="top-right" />
      </section>
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

  const mockBridge = createMockHostBridge({ theme: 'light', locale: 'en' });

  return (
    <HostBridgeProvider value={mockBridge}>
      <HashRouter>
        <AppRoutes isEmbedded={false} basename={effectiveBasename} />
      </HashRouter>
    </HostBridgeProvider>
  );
}

export default App;
