import type { NavManifest } from '@platform/runtime-mf-contract';

/** Single source for React remote pages (routes + standalone nav; emit later). */
export const remoteNavManifest = {
  contractVersion: 1,
  moduleId: 'remote',
  pages: [
    {
      id: 'overview',
      segment: '',
      label: { en: 'Overview', ru: 'Обзор' },
    },
    {
      id: 'details',
      segment: 'details',
      label: { en: 'Details', ru: 'Детали' },
    },
    {
      id: 'about',
      segment: 'about',
      label: { en: 'About', ru: 'О модуле' },
    },
    {
      id: 'form',
      segment: 'form',
      label: { en: 'Form', ru: 'Форма' },
    },
    {
      id: 'crash',
      segment: 'crash',
      label: { en: 'Crash test', ru: 'Тест падения' },
    },
  ],
} as const satisfies NavManifest;

export type RemoteNavPageId = (typeof remoteNavManifest.pages)[number]['id'];

/** React Router path for a manifest segment (`""` → `/`). */
export function navPagePath(segment: string): string {
  return segment ? `/${segment}` : '/';
}
