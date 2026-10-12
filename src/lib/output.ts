// What `kalku` prints, wrapped so it fits a card; the spans color it for
// reading. The report is the one in the README of kalku and the survivor
// as JSON is the example of its design document, abridged. The temporary
// directory is written as `$TMPDIR`, and a line that starts with `#` is a
// note, not output.

const c = (cls: string, text: string) => `<span class="t-${cls}">${text}</span>`;
const prompt = (cmd: string) => `${c('dim', '$')} ${cmd}\n`;

const survivor = `lib/green.ex:4  ${c('amber', 'compare')}  Green.classify/1
  ${c('red', '- &gt;=')}
  ${c('green', '+ &gt;')}
  covered by 4 tests`;

const score = `${c('amber', 'score 60%')} · ${c('green', '3 killed')} · ${c('red', '2 survived')} · 1 compile error`;

export const output = {
  report: `${prompt('kalku run lib/green.ex --limit 6 --verbose')}${survivor}
  ${c('dim', 'No test tells `&gt;=` apart from `&gt;` in\n  `Green.classify/1`. Add a case at the boundary\n  where the two sides are equal.')}

${score}`,

  holes: `${prompt('kalku run lib/green.ex --limit 6')}${survivor}`,

  score: `${prompt('kalku info outcomes')}  killed         ${c('green', 'counts towards the score')}
  survived       ${c('green', 'counts towards the score')}
  timeout        ${c('dim', 'reported apart from the score')}
  no_coverage    ${c('dim', 'reported apart from the score')}
  compile_error  ${c('dim', 'reported apart from the score')}
  crashed        ${c('dim', 'reported apart from the score')}

${score}`,

  reni: `${prompt('kalku run lib/thing.ex')}kalku: no .kalku.toml in this directory:
measuring it as elixir and ${c('green', 'leaving it as it is')}.
What the run keeps is in ${c('blue', '$TMPDIR/kalku/thing')};
\`kalku init\` sets the project up to keep it.`,

  warm: [
    `${c('dim', '$')} ${'kalku serve'.padEnd(21)}${c('dim', '# a 0600 Unix socket')}`,
    `${c('dim', '$')} ${'kalku cast &lt;wekufe&gt;'.padEnd(27)}${c('dim', '# re-cast just that one,')}`,
    `${''.padEnd(23)}${c('dim', '# against a warm kalku')}`,
  ].join('\n'),

  ci: `${prompt('kalku run --since origin/main')}${c('dim', '# exit 0  measured; nothing to report')}
${c('dim', '# exit')} ${c('red', '1')}  ${c('dim', 'your tests have holes')}
${c('dim', '# exit')} ${c('amber', '2')}  ${c('dim', 'kalku could not measure')}`,

  agents: `${prompt('kalku run lib/my_app/parser.ex --format agent')}{${c('blue', '"wekufe"')}:${c('green', '"c1f3…"')},
 ${c('blue', '"file"')}:${c('green', '"lib/my_app/parser.ex"')},${c('blue', '"line"')}:${c('amber', '42')},
 ${c('blue', '"enclosing"')}:${c('green', '"MyApp.Parser.next_token/2"')},
 ${c('blue', '"spell"')}:${c('green', '"compare"')},
 ${c('blue', '"original"')}:${c('green', '"&gt;="')},${c('blue', '"replacement"')}:${c('green', '"&gt;"')},
 ${c('blue', '"covering_count"')}:${c('amber', '1')},${c('blue', '"hint"')}:${c('green', '"No test tells…"')}}`,
} as const;
