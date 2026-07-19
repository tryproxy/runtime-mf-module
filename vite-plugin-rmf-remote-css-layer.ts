import type { Plugin } from 'vite';

const LAYER = 'rmf-remote';

/**
 * Demote the remote's compiled stylesheet into `@layer rmf-remote` so the
 * shell (which declares `rmf-remote` before its own theme/base/utilities) keeps
 * winning on colliding utilities like `.hidden` vs `.md:flex`.
 *
 * Must run AFTER Tailwind emits CSS — `@import "tailwindcss" layer(...)` fails
 * because Tailwind forbids nesting `@utility`.
 *
 * Class names stay global so body portals (Select/Dialog/Sonner) still work.
 */
export function rmfRemoteCssLayer(): Plugin {
  return {
    name: 'rmf-remote-css-layer',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type !== 'asset' || typeof item.source !== 'string') {
          continue;
        }
        if (!item.fileName.endsWith('.css')) {
          continue;
        }
        if (
          item.source.includes(`@layer ${LAYER}{`) ||
          item.source.includes(`@layer ${LAYER} {`)
        ) {
          continue;
        }
        item.source = demoteCssToLayer(item.source, LAYER);
      }
    },
  };
}

function demoteCssToLayer(css: string, layer: string): string {
  // `@property` must stay at the stylesheet top level.
  const properties: string[] = [];
  const withoutProperties = css.replace(
    /@property\s+[^{]+\{[^}]*\}/g,
    (match) => {
      properties.push(match);
      return '';
    }
  );

  return `${properties.join('')}\n@layer ${layer}{\n${withoutProperties}\n}`;
}
