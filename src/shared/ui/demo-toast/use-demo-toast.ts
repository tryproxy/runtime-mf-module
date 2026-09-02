import { useContext } from 'react';
import { DemoToastContext } from './demo-toast-context';

export function useDemoToast() {
  const toast = useContext(DemoToastContext);

  if (!toast) {
    throw new Error('useDemoToast must be used within DemoToastProvider');
  }

  return toast;
}
