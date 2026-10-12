export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'site.title': 'kalku · mutation testing para personas, CI y agentes de código',
    'site.description':
      'kalku rompe tu código a propósito, un defecto pequeño a la vez, y mira si algún test se da cuenta. Mutation testing para Elixir, Rust, Python, Java y kaikai.',

    'nav.features': 'Qué hace',
    'nav.video': 'Video',
    'nav.commands': 'Comandos',
    'nav.start': 'Empezar',
    'nav.docs': 'Docs',
    'nav.name': 'El nombre',

    'theme.toggle': 'Cambiar entre claro y oscuro',

    'hero.pill': 'Mira a Kalku explicarlo en tres minutos',
    'hero.title.line1': 'Tus tests pasan.',
    'hero.title.line2': '¿Pero prueban algo?',
    'hero.lead':
      'kalku rompe tu código a propósito, un defecto pequeño a la vez, y mira si algún test se da cuenta. El defecto que ningún test detecta es un hoyo en tu suite, y kalku te lo muestra con un archivo, una línea y un diff.',
    'hero.cta.start': 'Empezar',
    'hero.cta.video': 'Ver el video',
    'hero.whyName': '¿por qué este nombre?',
    'hero.mascot.alt':
      'Kalku, la mascota de kalku: un cóndor negro con cintillo y bufanda rojos, que sonríe con la boca llena de dientes',
    'hero.real': 'el reporte de una corrida, como aparece en el README de kalku',

    'install.copy': 'Copiar',
    'install.copied': 'Copiado',

    'video.eyebrow': 'Video',
    'video.title': 'kalku, explicado por Kalku',
    'video.body':
      'Tres minutos para ver qué es el mutation testing, cómo se usa kalku y por qué importa. Lo cuenta Kalku en primera persona: es brujo, y romper código es su oficio.',
    'video.other': 'Watch it in English',
    'video.unsupported': 'Tu navegador no reproduce este video. Puedes descargarlo:',

    'features.eyebrow': 'Qué hace',
    'features.title': 'Seis razones para dejar que Kalku rompa tu código',
    'features.intro':
      'La cobertura te dice qué líneas se ejecutaron. kalku te dice si algún test se daría cuenta cuando una de ellas está mal.',
    'features.holes.title': 'Los hoyos primero',
    'features.holes.body':
      'Un reporte empieza por los sobrevivientes: los defectos que ningún test detectó, cada uno con su archivo, su línea, su diff y una pista. El puntaje viene después, como contexto, porque el sobreviviente es aquello sobre lo que puedes actuar.',
    'features.score.title': 'Un puntaje honesto',
    'features.score.body':
      'El puntaje es killed / (killed + survived) y nada más lo mueve. Un timeout, una caída, un wekufe que no compiló o una línea que ningún test alcanza se reportan aparte: nunca cuentan como kill.',
    'features.reni.title': 'Tu proyecto no se toca',
    'features.reni.body':
      'Los wekufe se lanzan en el reni, un espacio de trabajo aislado bajo el directorio temporal de tu máquina. Un proyecto sin configurar se mide tal como está y se deja tal como está: no se escribe nada en él.',
    'features.warm.title': 'Rápido: kalku caliente',
    'features.warm.body':
      'Cada wekufe se carga en un kalku caliente y corre solo contra los tests que lo cubren, hasta el primero que falla. Con kalku serve, los kalku con los que se midió el proyecto sobreviven a la corrida, y la siguiente no vuelve a prepararlo.',
    'features.ci.title': 'En CI, solo lo que cambió',
    'features.ci.body':
      'kalku run --since origin/main mide las líneas que tocó el cambio y bloquea solo por los hoyos que ese cambio introdujo. La deuda antigua no castiga a quien toca el archivo, y los códigos de salida separan «tus tests tienen hoyos» de «kalku no pudo medir».',
    'features.agents.title': 'Hecho para agentes de código',
    'features.agents.body':
      'Los agentes escriben tests rápido; kalku les dice si esos tests prueban algo. Cada sobreviviente llega como un objeto JSON con todo lo necesario para actuar, y kalku mcp sirve cuatro herramientas por stdio. Ninguna suprime, excluye ni ignora nada.',
    'features.agents.note':
      'Las pistas salen de una plantilla fija por spell, no de un modelo. Un agente solo puede proponer un mutante equivalente; una persona tiene que aceptarlo.',

    'commands.eyebrow': 'Comandos',
    'commands.title': 'Todo lo que trae kalku',
    'commands.intro':
      'Un solo binario. Y kalku info documenta los spells, los resultados y los formatos desde el propio programa.',
    'commands.group.measure': 'Medir',
    'commands.group.project': 'En el proyecto',
    'commands.group.tools': 'Herramientas',
    'cmd.run': 'Lanza wekufe sobre esos archivos y reporta los sobrevivientes',
    'cmd.cast': 'Vuelve a lanzar un wekufe después de escribir un test',
    'cmd.show': 'Un wekufe completo: site, diff, tests, pista e historia',
    'cmd.init': 'Detecta el lenguaje y escribe .kalku.toml y .kalku/summon',
    'cmd.propose-equivalent': 'Propone un wekufe como equivalente, con su razón',
    'cmd.accept': 'Una persona acepta la propuesta, que pasa a .kalku/equivalent',
    'cmd.reject': 'Rechaza la propuesta: el wekufe vuelve a pedir un test',
    'cmd.info': 'Spells, resultados, formatos y el ciclo del agente',
    'cmd.serve': 'Conserva los kalku calientes detrás de un socket local',
    'cmd.mcp': 'Sirve las herramientas para agentes a un host MCP, por stdio',

    'cta.title': '¿Lo dejamos romper algo?',
    'cta.body':
      'Se instala con un comando y no necesita configuración. Empieza con kalku run sobre un archivo de tu proyecto.',
    'cta.docs': 'Leer la documentación',

    'start.eyebrow': 'Empezar',
    'start.title': 'Instala kalku y mide tu primer archivo',
    'start.lead':
      'Un comando para instalarlo y otro para medir, sin configurar nada y sin que se escriba nada en tu proyecto.',
    'start.install.title': 'Instalar',
    'start.install.brew': 'Con Homebrew:',
    'start.install.platforms':
      'Funciona en macOS con Apple Silicon y en Linux x86_64 con GLIBC 2.38 o más nuevo.',
    'start.install.bin': 'Los mismos tarballs están en cada release, por si no usas Homebrew.',
    'start.install.releases': 'Ver los releases',
    'start.first.title': 'La primera corrida',
    'start.first.body':
      'Desde la raíz de tu proyecto, nombra un archivo. Empieza con uno solo: la primera corrida sobre un proyecto completo es larga, y no enseña nada que un archivo no muestre ya.',
    'start.first.reads': 'Los sobrevivientes van primero y el puntaje después:',
    'start.next.title': 'Qué hacer después',
    'start.next.show': 'Lee un wekufe completo: site, diff, tests que lo cubren, pista e historia.',
    'start.next.cast': 'Vuelve a lanzar solo ese wekufe después de escribir el test.',
    'start.next.gate': 'La barrera para tu CI: mide solo las líneas que tocó el cambio.',
    'start.next.agent': 'Los sobrevivientes como JSON compacto, para tu agente de código.',
    'start.next.mcp': 'Las herramientas de kalku como servidor MCP, aquí en Claude Code.',
    'start.config.title': 'Configuración',
    'start.config.body':
      'No hace falta para medir. Para dejar kalku en un proyecto, con una configuración que el equipo comparte, kalku init detecta el lenguaje y escribe .kalku.toml y .kalku/summon.',
    'start.docs.title': 'Documentación completa',
    'start.docs.body': 'Cada tema y cada comando tienen su página.',

    'docs.eyebrow': 'Referencia',
    'docs.title': 'Documentación',
    'docs.lead':
      'Cómo medir un proyecto y leer una corrida, los spells, los resultados y el puntaje, la configuración, CI, agentes y cada comando de kalku.',
    'docs.group.guide': 'Para empezar',
    'docs.group.concepts': 'Conceptos',
    'docs.group.use': 'En tu flujo de trabajo',
    'docs.group.commands': 'Comandos',
    'docs.group.reference': 'Referencia',
    'docs.pager': 'Página anterior y siguiente',
    'docs.prev': 'Anterior',
    'docs.next': 'Siguiente',

    'about.eyebrow': 'El nombre',
    'about.title': 'Kalku, el brujo',
    'about.lead':
      'De dónde viene el nombre, qué es cada palabra del elenco y quién es el cóndor que sonríe a su lado.',
    'about.name.title': 'kalku',
    'about.name.p1':
      'En la creencia mapuche, un kalku es un brujo que trabaja en una cueva escondida, el reni, y manda a los wekufe, espíritus que hacen daño.',
    'about.name.p2':
      'La herramienta toma prestado ese elenco porque hace eso mismo con tu código: le lanza un defecto pequeño a la vez y mira si algún test se da cuenta.',
    'about.cast.title': 'El elenco',
    'about.cast.intro': 'Cuatro palabras, y cada una nombra una pieza de la herramienta:',
    'about.cast.kalku.term': 'kalku',
    'about.cast.kalku.body':
      'Un worker ligado a un lenguaje, que sabe romper código en ese lenguaje.',
    'about.cast.wekufe.term': 'wekufe',
    'about.cast.wekufe.body':
      'Un mutante: tu programa con exactamente un defecto lanzado en él. El plural no cambia: los wekufe.',
    'about.cast.spell.term': 'kalkutun / spell',
    'about.cast.spell.body':
      'Un tipo de defecto: borrar una cláusula de un case, correr >= a >, cambiar and por or. Kalkutun es el daño que obra un kalku; el código y el protocolo dicen spell.',
    'about.cast.reni.term': 'reni',
    'about.cast.reni.body':
      'Un espacio de trabajo aislado donde se lanzan los wekufe. Tu árbol de trabajo nunca se toca.',
    'about.cast.plain':
      'Los reportes usan palabras simples (killed, survived, timeout) para que un log de CI se lea sin el glosario.',
    'about.mascot.title': 'Kalku',
    'about.mascot.p1':
      'Kalku es un cóndor brujo: negro, con cintillo y bufanda rojos y una sonrisa llena de dientes.',
    'about.mascot.p2':
      'Es bueno, pero se da aires de siniestro. Rompe tu código a propósito y lo hace por tu bien: para que sepas si tus tests lo notan.',
    'about.kimun.title': 'Madu, de la misma familia',
    'about.kimun.p1':
      'Kalku es hermano de Madu, la pudú machi que es mascota de Kimün, una herramienta que mide la salud de tu código desde la terminal. Madu mide el código; Kalku lo rompe para saber si los tests lo notan.',
    'about.kimun.link': 'Conoce Kimün',

    'footer.tagline': 'Mutation testing para personas, CI y agentes de código.',
    'footer.copy': 'Por Eduardo Díaz. Licencia MIT o Apache-2.0.',
  },
  en: {
    'site.title': 'kalku · mutation testing for humans, CI, and coding agents',
    'site.description':
      'kalku breaks your code on purpose, one small defect at a time, and sees whether any test notices. Mutation testing for Elixir, Rust, Python, Java and kaikai.',

    'nav.features': 'What it does',
    'nav.video': 'Video',
    'nav.commands': 'Commands',
    'nav.start': 'Get started',
    'nav.docs': 'Docs',
    'nav.name': 'The name',

    'theme.toggle': 'Switch between light and dark',

    'hero.pill': 'Watch Kalku explain it in three minutes',
    'hero.title.line1': 'Your tests pass.',
    'hero.title.line2': 'But do they test anything?',
    'hero.lead':
      'kalku breaks your code on purpose, one small defect at a time, and sees whether any test notices. A defect that no test catches is a hole in your suite, and kalku shows it to you with a file, a line and a diff.',
    'hero.cta.start': 'Get started',
    'hero.cta.video': 'Watch the video',
    'hero.whyName': 'why this name?',
    'hero.mascot.alt':
      'Kalku, the mascot of kalku: a black condor in a red headband and scarf, grinning with a mouthful of teeth',
    'hero.real': 'the report of a run, as it appears in the README of kalku',

    'install.copy': 'Copy',
    'install.copied': 'Copied',

    'video.eyebrow': 'Video',
    'video.title': 'kalku, explained by Kalku',
    'video.body':
      'Three minutes on what mutation testing is, how you use kalku and why it matters. Kalku tells it in the first person: he is a sorcerer, and breaking code is his trade.',
    'video.other': 'Míralo en español',
    'video.unsupported': 'Your browser cannot play this video. You can download it:',

    'features.eyebrow': 'What it does',
    'features.title': 'Six reasons to let Kalku break your code',
    'features.intro':
      'Coverage tells you which lines ran. kalku tells you whether any test would notice when one of them is wrong.',
    'features.holes.title': 'Holes first',
    'features.holes.body':
      'A report starts with the survivors: the defects no test caught, each with its file, its line, its diff and a hint. The score comes after, as context, because the survivor is the thing you can act on.',
    'features.score.title': 'An honest score',
    'features.score.body':
      'The score is killed / (killed + survived) and nothing else moves it. A timeout, a crash, a wekufe that did not compile or a line no test reaches are reported apart: they never count as a kill.',
    'features.reni.title': 'Your project is never touched',
    'features.reni.body':
      'Wekufe are cast in the reni, an isolated workspace under the temporary directory of your machine. A project with no configuration is measured as it is and left as it is: nothing is written into it.',
    'features.warm.title': 'Fast: a warm kalku',
    'features.warm.body':
      'Each wekufe is loaded into a warm kalku and runs only against the tests that cover it, stopping at the first one that fails. With kalku serve, the kalku a project was measured with outlive the run, and the next one does not set the project up again.',
    'features.ci.title': 'In CI, only what changed',
    'features.ci.body':
      'kalku run --since origin/main measures the lines the change touched and blocks only on the holes that change introduced. Old debt does not punish whoever touches the file, and the exit codes separate "your tests have holes" from "kalku could not measure".',
    'features.agents.title': 'Built for coding agents',
    'features.agents.body':
      'Agents write tests fast; kalku tells them whether those tests test anything. Each survivor arrives as one JSON object with everything needed to act, and kalku mcp serves four tools over stdio. None of them suppresses, excludes or ignores anything.',
    'features.agents.note':
      'Hints come from a fixed template per spell, not from a model. An agent can only propose an equivalent mutant; a person has to accept it.',

    'commands.eyebrow': 'Commands',
    'commands.title': 'Everything kalku brings',
    'commands.intro':
      'One binary. And kalku info documents the spells, the outcomes and the formats from the program itself.',
    'commands.group.measure': 'Measure',
    'commands.group.project': 'In the project',
    'commands.group.tools': 'Tools',
    'cmd.run': 'Casts wekufe over those files and reports the survivors',
    'cmd.cast': 'Re-casts a wekufe after a test was written',
    'cmd.show': 'One wekufe in full: site, diff, tests, hint and history',
    'cmd.init': 'Detects the language and writes .kalku.toml and .kalku/summon',
    'cmd.propose-equivalent': 'Proposes a wekufe as equivalent, with its reason',
    'cmd.accept': 'A person accepts the proposal, which goes into .kalku/equivalent',
    'cmd.reject': 'Turns the proposal down: the wekufe wants a test again',
    'cmd.info': 'Spells, outcomes, formats and the agent loop',
    'cmd.serve': 'Keeps the kalku warm behind a local socket',
    'cmd.mcp': 'Serves the agent tools to an MCP host, over stdio',

    'cta.title': 'Shall we let him break something?',
    'cta.body':
      'It installs with one command and needs no configuration. Start with kalku run on one file of your project.',
    'cta.docs': 'Read the documentation',

    'start.eyebrow': 'Get started',
    'start.title': 'Install kalku and measure your first file',
    'start.lead':
      'One command to install it and one to measure, with nothing to configure and nothing written into your project.',
    'start.install.title': 'Install',
    'start.install.brew': 'With Homebrew:',
    'start.install.platforms':
      'It runs on macOS on Apple Silicon and on Linux on x86_64 with GLIBC 2.38 or newer.',
    'start.install.bin': 'The same tarballs are on every release, in case you do not use Homebrew.',
    'start.install.releases': 'See the releases',
    'start.first.title': 'The first run',
    'start.first.body':
      'From the root of your project, name one file. Start with a single one: the first run over a whole project is long, and teaches nothing one file does not already show.',
    'start.first.reads': 'Survivors come first and the score comes after:',
    'start.next.title': 'What to do next',
    'start.next.show': 'Read one wekufe in full: site, diff, covering tests, hint and history.',
    'start.next.cast': 'Re-cast just that wekufe after writing the test.',
    'start.next.gate': 'The gate for your CI: it measures only the lines the change touched.',
    'start.next.agent': 'The survivors as compact JSON, for your coding agent.',
    'start.next.mcp': 'The tools of kalku as an MCP server, here in Claude Code.',
    'start.config.title': 'Configuration',
    'start.config.body':
      'None is needed to measure. To keep kalku in a project, with a configuration the team shares, kalku init detects the language and writes .kalku.toml and .kalku/summon.',
    'start.docs.title': 'Full documentation',
    'start.docs.body': 'Every subject and every command has its own page.',

    'docs.eyebrow': 'Reference',
    'docs.title': 'Documentation',
    'docs.lead':
      'How to measure a project and read a run, the spells, the outcomes and the score, the configuration, CI, agents and every kalku command.',
    'docs.group.guide': 'Getting started',
    'docs.group.concepts': 'Concepts',
    'docs.group.use': 'In your workflow',
    'docs.group.commands': 'Commands',
    'docs.group.reference': 'Reference',
    'docs.pager': 'Previous and next page',
    'docs.prev': 'Previous',
    'docs.next': 'Next',

    'about.eyebrow': 'The name',
    'about.title': 'Kalku, the sorcerer',
    'about.lead':
      'Where the name comes from, what each word of the cast is, and who the condor grinning beside it is.',
    'about.name.title': 'kalku',
    'about.name.p1':
      'In Mapuche belief, a kalku is a sorcerer who works in a hidden cave, the reni, and commands the wekufe, spirits that bring harm.',
    'about.name.p2':
      'The tool borrows that cast because it does the same to your code: it casts one small defect into it at a time and sees whether any test notices.',
    'about.cast.title': 'The cast',
    'about.cast.intro': 'Four words, and each one names a piece of the tool:',
    'about.cast.kalku.term': 'kalku',
    'about.cast.kalku.body':
      'A worker bound to one language, which knows how to break code in that language.',
    'about.cast.wekufe.term': 'wekufe',
    'about.cast.wekufe.body':
      'A mutant: your program with exactly one defect cast into it. The plural is the same word: wekufe.',
    'about.cast.spell.term': 'kalkutun / spell',
    'about.cast.spell.body':
      'A kind of defect: drop a case clause, shift >= to >, swap and for or. Kalkutun is the harm a kalku works; code and protocol say spell.',
    'about.cast.reni.term': 'reni',
    'about.cast.reni.body':
      'An isolated workspace where wekufe are cast. Your working tree is never touched.',
    'about.cast.plain':
      'Reports use plain words (killed, survived, timeout) so a CI log reads without the glossary.',
    'about.mascot.title': 'Kalku',
    'about.mascot.p1':
      'Kalku is a sorcerer condor: black, with a red headband and scarf and a grin full of teeth.',
    'about.mascot.p2':
      'He is good, but he likes to look sinister. He breaks your code on purpose, and he does it for your sake: so you know whether your tests notice.',
    'about.kimun.title': 'Madu, of the same family',
    'about.kimun.p1':
      'Kalku is the brother of Madu, the pudú machi who is the mascot of Kimün, a tool that measures the health of your code from the terminal. Madu measures the code; Kalku breaks it to learn whether the tests notice.',
    'about.kimun.link': 'Meet Kimün',

    'footer.tagline': 'Mutation testing for humans, CI, and coding agents.',
    'footer.copy': 'By Eduardo Díaz. MIT or Apache-2.0 license.',
  },
} as const;

export type Key = keyof (typeof ui)['es'];

export function t(lang: Lang) {
  return (key: Key) => ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return 'es';
}

export function pathInLang(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'es') return clean === '/' ? '/' : clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}
