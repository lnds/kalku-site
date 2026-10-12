import { SITE_URL } from '../../site.config.mjs';

export const links = {
  site: SITE_URL,
  github: {
    kalku: 'https://github.com/lnds/kalku',
    releases: 'https://github.com/lnds/kalku/releases',
  },
  kimun: 'https://kimun.tools',
  hex: 'https://hex.pm/packages/kalku_elixir',
  blog: 'https://lnds.net',
  install: {
    brew: 'brew install lnds/kalku/kalku',
  },
  video: {
    es: { src: '/video/kalku-explicado.mp4', poster: '/video/poster-es.jpg' },
    en: { src: '/video/kalku-explained.mp4', poster: '/video/poster-en.jpg' },
  },
} as const;
