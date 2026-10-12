---
title: "Qué te dice una corrida"
description: "Cómo leer el reporte: los sobrevivientes primero, el puntaje después, y los cuatro formatos de salida."
---

```sh
kalku run lib/green.ex --limit 6 --verbose
```

```
lib/green.ex:4  compare  Green.classify/1
  - >=
  + >
  covered by 4 tests
  No test tells `>=` apart from `>` in `Green.classify/1`. Add a case at the boundary where the two sides are equal.

score 60% · 3 killed · 2 survived · 1 compile error
```

## Un sobreviviente, línea por línea

| Línea | Qué dice |
|---|---|
| `lib/green.ex:4  compare  Green.classify/1` | El archivo y la línea, el [spell](../spells/) que hizo el wekufe y la función que lo contiene |
| `- >=` y `+ >` | El cambio, como un diff: lo que había y lo que el wekufe puso en su lugar |
| `covered by 4 tests` | Cuántos tests alcanzan esa línea. El wekufe se lanzó contra esos tests y ninguno lo notó |
| `No test tells…` | La pista: qué test falta. Sale de una plantilla fija por spell, no de un modelo |

Los sobrevivientes van primero y el puntaje después, porque el sobreviviente es aquello sobre lo que puedes actuar.

`covered by 4 tests` no es adorno: la línea base registra qué tests alcanzan qué líneas, y un wekufe se lanza solo contra esos tests. Un site que ningún test alcanza es `no_coverage`, nunca un kill; tampoco lo es un timeout, una caída, ni un wekufe que no compiló.

## El puntaje

```
score 60% · 3 killed · 2 survived · 1 compile error
```

El puntaje es `killed / (killed + survived)` y nada más lo mueve: aquí, 3 de 5. El wekufe que no compiló se cuenta al lado, no adentro. [Resultados y puntaje](../outcomes/) explica cada resultado.

## Leer un wekufe de vuelta

Un wekufe se nombra por el texto en el que fue lanzado, así que editar su archivo lo renombra; volver a lanzar un nombre antiguo te lo dice, y un nuevo `kalku run` entrega los nuevos.

```sh
kalku show <wekufe>            # site, diff, covering tests, hint, history
kalku cast <wekufe>            # re-cast just that one
kalku info outcomes            # what each outcome means
```

## Formatos

`--format` elige cómo se reporta una corrida. Esto es lo que responde `kalku info formats`:

| Formato | Qué entrega |
|---|---|
| `human` | El formato por defecto: los sobrevivientes primero, cada uno con archivo, línea, spell, diff y una pista. El puntaje es contexto y se imprime al final |
| `agent` | NDJSON: una línea por sobreviviente y un resumen. Cada línea trae todo lo necesario para actuar sin abrir un archivo. Mira [Para agentes de código](../agents/) |
| `json` | El reporte completo como un solo objeto |
| `github` | Comandos de workflow, para que los sobrevivientes aparezcan sobre el diff. Mira [En CI](../ci/) |
