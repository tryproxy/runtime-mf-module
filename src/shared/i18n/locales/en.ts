export const en = {
  nav: {
    overview: 'Overview',
    details: 'Details',
    about: 'About',
    crash: 'Crash test',
    language: 'Language',
  },
  home: {
    title: 'Remote module',
    description:
      'Module-owned technical surface. Shell owns the /remote/* namespace; this module uses React Router under that basename. Panel colors come from shell CSS tokens (--rmf-*).',
    owner: 'Owner',
    ownerValue: 'Module',
    ownerDesc: 'Rendered by runtime-mf-module.',
    mode: 'Mode',
    modeEmbedded: 'Embedded',
    modeStandalone: 'Standalone',
    modeEmbeddedDesc: 'Loaded inside the shell remote slot.',
    modeStandaloneDesc: 'Running without the shell host.',
    activePath: 'Active path',
    activePathDesc: 'Current path from React Router (relative to basename).',
    basename: 'Basename',
    basenameDesc: 'Route namespace the shell passes into mount().',
    entry: 'Entry',
    entryDesc: 'Federation expose the shell imports at runtime.',
    proves: 'What this proves',
    provesValue: 'mount()',
    provesDesc:
      'Independent build → remoteEntry.js → shell calls mount() with container + bridge.',
    notesTitle: 'Contract notes',
    noteLayout: 'Shell owns layout, theme toggle, sidebar, and CSS tokens.',
    noteMount:
      'Module is loaded via federation and mounted into a host container.',
    noteBridge:
      'Host bridge supplies theme / locale / navigation / auth — paint tokens arrive as CSS variables on html[data-rmf-theme].',
    noteI18n: 'Locale follows the shell via bridge.i18n when embedded.',
  },
  details: {
    title: 'Details',
    description:
      'Module-owned React Router route under the shell basename. Use browser back / forward after Overview → Details → About.',
    route: 'Route',
    routeDesc: 'Interpreted by the module React Router, not the shell.',
    activePath: 'Active path',
    activePathDesc: 'Current path from React Router (relative to basename).',
    basename: 'Basename',
    basenameDesc: 'Namespace the shell passed into mount().',
    history: 'History check',
    historyValue: 'back / forward',
    historyDesc: 'Shell must keep RemoteSlot mounted for /remote/*.',
  },
  about: {
    title: 'About',
    description:
      'Another module-owned React Router route. Same mount session as Overview and Details — only the module view should change.',
    route: 'Route',
    routeDesc: 'Third path for the history experiment.',
    activePath: 'Active path',
    activePathDesc: 'Current path from React Router (relative to basename).',
    basename: 'Basename',
    basenameDesc: 'Namespace the shell passed into mount().',
    ownership: 'Ownership',
    ownershipValue: 'React Router',
    ownershipDesc:
      'Shell owns /remote/* namespace; module owns routes under basename.',
  },
  crash: {
    title: 'Crash test',
    description:
      'Click the button to throw during render. The module Error Boundary should replace this view; shell chrome should stay. Retry clears the boundary.',
    button: 'Crash module render',
  },
  error: {
    title: 'Something went wrong in this module',
    description:
      'The module hit a render error. The shell layout should still be usable.',
    label: 'Error',
    retry: 'Retry',
  },
} as const;
