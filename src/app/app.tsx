import { AboutPage } from '@/pages/about';
import { CrashPage } from '@/pages/crash';
import { DetailsPage } from '@/pages/details';
import { HomePage } from '@/pages/home';
import { ModuleNav } from '@/app/ui/module-nav';
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
    <section className="space-y-6">
      <ModuleNav showLocaleSwitch={!isEmbedded} />

      <Routes>
        <Route
          path="/"
          element={<HomePage isEmbedded={isEmbedded} basename={basename} />}
        />
        <Route path="/details" element={<DetailsPage basename={basename} />} />
        <Route path="/about" element={<AboutPage basename={basename} />} />
        <Route path="/crash" element={<CrashPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </section>
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

  return (
    <HashRouter>
      <AppRoutes isEmbedded={false} basename={effectiveBasename} />
    </HashRouter>
  );
}

export default App;
