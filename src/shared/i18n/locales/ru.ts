export const ru = {
  nav: {
    overview: 'Обзор',
    details: 'Детали',
    about: 'О модуле',
    crash: 'Тест падения',
    language: 'Язык',
  },
  home: {
    title: 'Удалённый модуль',
    description:
      'Техническая поверхность модуля. Shell владеет пространством /remote/*; этот модуль использует React Router под basename. Цвета панелей — из CSS-токенов shell (--rmf-*).',
    owner: 'Владелец',
    ownerValue: 'Модуль',
    ownerDesc: 'Рендерится runtime-mf-module.',
    mode: 'Режим',
    modeEmbedded: 'Встроенный',
    modeStandalone: 'Автономный',
    modeEmbeddedDesc: 'Загружен внутри remote-слота shell.',
    modeStandaloneDesc: 'Работает без host shell.',
    activePath: 'Активный путь',
    activePathDesc: 'Текущий путь из React Router (относительно basename).',
    basename: 'Basename',
    basenameDesc: 'Пространство маршрутов, которое shell передаёт в mount().',
    entry: 'Точка входа',
    entryDesc: 'Federation expose, который shell импортирует в рантайме.',
    proves: 'Что доказывает',
    provesValue: 'mount()',
    provesDesc:
      'Независимый билд → remoteEntry.js → shell вызывает mount() с container + bridge.',
    notesTitle: 'Заметки по контракту',
    noteLayout: 'Shell владеет layout, темой, сайдбаром и CSS-токенами.',
    noteMount:
      'Модуль грузится через federation и монтируется в контейнер host.',
    noteBridge:
      'Host bridge даёт theme / locale / navigation / auth — токены краски приходят как CSS-переменные на html[data-rmf-theme].',
    noteI18n: 'Локаль следует за shell через bridge.i18n во встроенном режиме.',
  },
  details: {
    title: 'Детали',
    description:
      'Маршрут React Router модуля под basename shell. После Обзор → Детали → О модуле проверьте назад / вперёд в браузере.',
    route: 'Маршрут',
    routeDesc: 'Интерпретирует React Router модуля, не shell.',
    activePath: 'Активный путь',
    activePathDesc: 'Текущий путь из React Router (относительно basename).',
    basename: 'Basename',
    basenameDesc: 'Пространство, которое shell передал в mount().',
    history: 'Проверка истории',
    historyValue: 'назад / вперёд',
    historyDesc:
      'Shell должен держать RemoteSlot смонтированным для /remote/*.',
  },
  about: {
    title: 'О модуле',
    description:
      'Ещё один маршрут модуля. Та же сессия mount, что у Обзора и Деталей — меняется только вид модуля.',
    route: 'Маршрут',
    routeDesc: 'Третий путь для эксперимента с историей.',
    activePath: 'Активный путь',
    activePathDesc: 'Текущий путь из React Router (относительно basename).',
    basename: 'Basename',
    basenameDesc: 'Пространство, которое shell передал в mount().',
    ownership: 'Владение',
    ownershipValue: 'React Router',
    ownershipDesc:
      'Shell владеет /remote/*; модуль владеет маршрутами под basename.',
  },
  crash: {
    title: 'Тест падения',
    description:
      'Кнопка бросает ошибку при рендере. Error Boundary модуля должен заменить вид; chrome shell остаётся. Retry сбрасывает boundary.',
    button: 'Уронить модуль',
  },
  error: {
    title: 'В этом модуле что-то сломалось',
    description:
      'Модуль поймал ошибку рендера. Layout shell должен оставаться usable.',
    label: 'Ошибка',
    retry: 'Повторить',
  },
} as const;
