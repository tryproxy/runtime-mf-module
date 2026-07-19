import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RemoteErrorBoundary } from '@/entry/ui/remote-error-boundary';
import './index.css';
import App from './app';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RemoteErrorBoundary>
      <App />
    </RemoteErrorBoundary>
  </StrictMode>
);
