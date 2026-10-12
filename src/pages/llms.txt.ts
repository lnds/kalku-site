import type { APIRoute } from 'astro';
import { t, pathInLang, type Lang } from '../i18n/ui';
import { docGroups, docPath, docsOf } from '../lib/docs';
import { links } from '../lib/links';

const url = (path: string, lang: Lang) => `${links.site}${pathInLang(path, lang)}`;

// The pages of the documentation of one language, as a list of links.
async function docLinks(lang: Lang): Promise<string> {
  const docs = await docsOf(lang);
  return docGroups
    .flatMap(({ slugs }) => slugs)
    .map((slug) => {
      const { title, description } = docs.get(slug)!.data;
      return `- [${title}](${links.site}${docPath(slug, lang)}): ${description}`;
    })
    .join('\n');
}

export const GET: APIRoute = async () => {
  const text = `# kalku

> kalku is a mutation testing tool for humans, CI, and coding agents. It checks how good a test suite really is by breaking the code on purpose, one small defect at a time, and seeing whether any test notices. A defect that no test catches is a hole in the suite, reported with a file, a line and a diff. It measures Elixir, Rust, Python, Java and kaikai projects. Licensed MIT OR Apache-2.0. The site kalku.tools is available in Spanish (root paths) and English (paths under /en/).

Survivors come first in every report and the score, \`killed / (killed + survived)\`, comes after. \`kalku run <files> --format agent\` gives one survivor per line as JSON, \`kalku cast <wekufe>\` re-casts one after a test was written, and \`kalku mcp\` serves the same loop to an MCP host over stdio. An agent can only propose an equivalent mutant; a person has to accept it.

Install with \`${links.install.brew}\`.

## Site

- [Home (en)](${url('/', 'en')}): what kalku does, with the report of a run, the explainer video and the list of commands.
- [Get started (en)](${url('/get-started/', 'en')}): installation, the first run and what to do next.
- [The name (en)](${url('/about/', 'en')}): what kalku, wekufe, kalkutun and reni mean, and who Kalku, the mascot, is.
- [${t('en')('docs.title')} (en)](${url('/docs/', 'en')}): the index of the reference.

## Documentation

${await docLinks('en')}

## Español

- [Inicio (es)](${url('/', 'es')}): qué hace kalku, con el reporte de una corrida, el video y la lista de comandos.
- [Empezar (es)](${url('/get-started/', 'es')}): instalación, la primera corrida y qué hacer después.
- [El nombre (es)](${url('/about/', 'es')}): qué significan kalku, wekufe, kalkutun y reni, y quién es Kalku, la mascota.
- [${t('es')('docs.title')} (es)](${url('/docs/', 'es')}): el índice de la referencia.

## Documentación en español

${await docLinks('es')}

## Source

- [GitHub · lnds/kalku](${links.github.kalku}): source code, issues and releases.
- [Hex · kalku_elixir](${links.hex}): the Elixir kalku, as a package.

## Video

- [kalku explained (en)](${links.site}${links.video.en.src}): three minutes, narrated by Kalku.
- [kalku explicado (es)](${links.site}${links.video.es.src}): tres minutos, narrado por Kalku.

## Family

- [Kimün](${links.kimun}): the sister tool, which measures the health of a codebase; its mascot, Madu, is the sister of Kalku.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
