---
title: "Para agentes de código"
description: "El ciclo para el que está hecho kalku: encontrar un sobreviviente, escribir un test, volver a lanzar y repetir."
---

Los agentes de código escriben tests rápido, pero un test puede ejecutar una línea sin comprobar nada sobre ella. La cobertura no detecta eso; el mutation testing sí. **Los agentes escriben tests rápido; kalku les dice si esos tests prueban algo.**

Las personas leen una corrida y CI controla una corrida por pull request. Un agente itera: encuentra un sobreviviente, escribe un test, revisa si el wekufe murió, y repite. kalku está hecho para ese ciclo.

```sh
kalku run lib/thing.ex --format agent   # survivors as compact JSON, each with a hint
kalku cast <wekufe>                     # re-cast just that one, against a warm kalku
kalku info agents --snippet             # lines to paste into CLAUDE.md / AGENTS.md
```

## Todo lo necesario para actuar, en un objeto

`--format agent` entrega NDJSON: una línea por sobreviviente y un resumen al final. Este es el ejemplo del documento de diseño de kalku:

```json
{"wekufe":"c1f3…","file":"lib/my_app/parser.ex","line":42,"enclosing":"MyApp.Parser.next_token/2",
 "spell":"compare","original":">=","replacement":">",
 "context":["defp next_token(s, i) when i >= 0 do","  case String.at(s, i) do"],
 "covering_tests":["test/my_app/parser_test.exs:18"],"covering_count":1,
 "hint":"No test tells i == 0 apart from i > 0. Add a case at the boundary i = 0."}
```

Archivo, línea, función que lo contiene, el cambio, el código alrededor, los tests que lo cubren y una pista. `covering_tests` lista los primeros cinco tests que cubren la línea, y `covering_count` dice cuántos son; la lista completa la entrega `kalku show <wekufe>`.

Las pistas salen de una plantilla fija por spell, no de un modelo.

## Resguardos

Un agente que optimiza por wekufe muertos puede llegar al número sin cerrar hoyos, sin mala intención. kalku hace que esos atajos sean visibles o imposibles:

- **Un agente solo puede *proponer* un mutante equivalente**; una persona tiene que aceptarlo. Mira [Mutantes equivalentes](../equivalents/).
- **Las supresiones hacen ruido.** Las que agrega un pull request aparecen bajo su propio encabezado en cada reporte.
- **Un kill necesita un test que pase en el código original.** Un test que falla en ambos es un test roto, no un kill.
- **Un timeout nunca cuenta como kill.**

## Las líneas para tu agente

`kalku info agents --snippet` imprime las líneas para pegar en `CLAUDE.md` o `AGENTS.md`:

```
After writing or changing tests, run `kalku run <files> --format agent`
and close the survivors with tests that pass on the original code.
Never edit `.kalku/equivalent`, `exclude`, or `exclude_calls` to make a
survivor go away: propose an equivalent with a reason instead.
Put the proposals somewhere a person reads them before they take
effect — a pull request, not a commit to the main branch. A
suppression nobody read is a hole nobody knows about.
```

## Sin pasar por la shell

[`kalku mcp`](../mcp/) sirve el mismo ciclo como cuatro herramientas MCP, por stdio.
