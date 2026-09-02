import { createContext } from 'react';

export type DemoToastApi = {
  show(message: string): void;
};

export const DemoToastContext = createContext<DemoToastApi | null>(null);
