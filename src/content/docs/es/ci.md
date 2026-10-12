---
title: "En CI"
description: "Controla un pull request por los hoyos que él introdujo con --since, y el puntaje global con una corrida nocturna."
---

Un pull request se controla por lo que **él** introdujo, no por un puntaje global que castiga a quien toque un archivo con deuda antigua:

```sh
kalku run --since origin/main
```

Eso mide solo las líneas que tocó el cambio, y sale con `1` cuando introdujo un hoyo: un wekufe que sobrevivió en una de esas líneas, o código en una de ellas que ningún test alcanza. La deuda antigua en otra parte del mismo archivo no lo bloquea.

## Códigos de salida

| Código | Significado |
|---|---|
| `0` | Se midió; nada que reportar |
| `1` | Se midió, y tus tests tienen hoyos: sobrevivientes en líneas cambiadas, sites en líneas cambiadas que ningún test alcanza, o un puntaje bajo el umbral o bajo la línea base |
| `2` | kalku no pudo medir: tests que fallan antes de lanzar nada, un `prepare` fallido, una entrada huérfana en `.kalku/equivalent`, un error de configuración |

*«Tus tests tienen hoyos»* y *«kalku no pudo medir»* son fallas distintas, y CI tiene que poder distinguirlas. `2` es también lo que obtienes cuando git no puede decir qué cambió: una barrera que leyera eso como *«nada cambió»* dejaría pasar todo pull request que no pudiera leer.

## Desde dónde se mide

El cambio se mide desde donde la rama se separó de `origin/main`, y el árbol de trabajo cuenta, así que un cambio que todavía se está escribiendo se juzga tal como va a quedar en el commit.

Un checkout de CI necesita historia suficiente para encontrar ese punto. En GitHub Actions, con kalku ya instalado en el runner:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- run: kalku run --since origin/${{ github.base_ref }} --format github
```

`--format github` emite comandos de workflow, para que los sobrevivientes aparezcan sobre el diff.

## --limit y un cambio

Una corrida a la que se le pregunta por un cambio lo lanza completo. Si pasas `--limit` y eso corta el cambio, un resultado limpio no es una respuesta, y la corrida sale con `2` en vez de pasar por alto líneas que nadie miró.

## El puntaje global, de noche

Medir el proyecto completo en cada pull request no escala. Para eso están `--all` y `--shard`:

```sh
kalku run --all --shard 1/4
```

`--all` mide todos los archivos de código del proyecto, con todos sus wekufe. `--shard i/n` lanza solo la parte `i` de `n`: la misma parte en cada máquina, de modo que `n` jobs cubren un proyecto entre todos. Un shard dice que lo es y no se le exige el umbral. Combinar los reportes de los shards (`merge`) todavía no está implementado.

## El ratchet

Con `ratchet = true` en la sección `[score]` de [`.kalku.toml`](../configuration/), el puntaje del proyecto completo no puede bajar de la línea base guardada:

```sh
kalku run --all --store-baseline
```

- Una corrida nunca escribe la línea base sin que se lo pidas.
- Solo el proyecto completo queda sujeto a ella. El puntaje de unos archivos, de un cambio (`--since`) o de un shard es de otra cosa, y no se compara.
- Que no haya línea base no es pasar: un proyecto que activó el ratchet y no guardó nada termina con código `2` y el comando que la guarda.

## Lo que todavía no está

`--watch`, `--ci` y `merge` no están implementados. [Qué funciona hoy](../status/) tiene la lista completa.
