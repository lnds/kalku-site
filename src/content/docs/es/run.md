---
title: "kalku run"
description: "Lanza wekufe sobre unos archivos y reporta los sobrevivientes."
---

Mide los archivos que nombras: lanza wekufe sobre ellos, uno a la vez, y reporta los que ningún test detectó.

```sh
kalku run [files...] [options]
```

```sh
kalku run lib/thing.ex                    # un archivo
kalku run lib/green.ex --limit 6 --verbose
kalku run --since origin/main             # solo las líneas que tocó el cambio
kalku run --all --shard 1/4               # el proyecto completo, por partes
kalku run lib/thing.ex --format agent     # sobrevivientes como NDJSON
```

## Opciones

| Opción | Qué hace |
|---|---|
| `--limit <n>` | Lanza a lo más `n` wekufe: 100 por defecto, 0 para todos. Una corrida con `--since` lanza el cambio completo salvo que digas otra cosa |
| `--since <ref>` | Mide solo las líneas cambiadas desde esa referencia de git, y bloquea cuando un wekufe sobrevive en una de ellas |
| `--all` | Mide todos los archivos de código del proyecto, con todos sus wekufe |
| `--shard <i/n>` | Lanza solo la parte `i` de `n`: la misma parte en cada máquina, de modo que `n` jobs cubren un proyecto entre todos |
| `--store-baseline` | Guarda el puntaje de esta corrida como la línea base a la que `ratchet = true` sujeta las corridas siguientes del proyecto completo |
| `--format <name>` | `human` (por defecto), `agent`, `json` o `github` |
| `-v`, `--verbose` | Va diciendo qué hace la corrida mientras lo hace |

## Códigos de salida

| Código | Significado |
|---|---|
| `0` | Se midió; nada que reportar |
| `1` | Se midió, y tus tests tienen hoyos |
| `2` | kalku no pudo medir |

[En CI](../ci/) explica cada uno.

## Qué leer después

- [Qué te dice una corrida](../report/): cómo leer el reporte y los formatos.
- [Resultados y puntaje](../outcomes/): en qué puede terminar cada wekufe.
- [En CI](../ci/): `--since`, `--all`, `--shard` y el ratchet.
