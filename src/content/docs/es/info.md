---
title: "kalku info"
description: "Lo que kalku sabe de spells, resultados, formatos y agentes, documentado desde el propio binario."
---

Documenta los spells, los resultados, los formatos y el ciclo del agente desde el propio binario. Es la fuente a la que un agente consulta en vez de adivinar.

```sh
kalku info [topic] [options]
```

Sin un tema, lista los que hay:

```
topics:
  spells          The kinds of defect kalku casts, one per wekufe.
  outcomes        What a cast can come to. The score is killed / (killed + survived), and nothing else.
  formats         How a run reports what it found.
  agents          The loop kalku is built for, and the rules that keep it honest.
```

## Temas

| Tema | Qué responde |
|---|---|
| `kalku info spells` | Los tipos de defecto que lanza kalku, uno por wekufe. Mira [Spells](../spells/) |
| `kalku info outcomes` | En qué puede terminar un cast. Mira [Resultados y puntaje](../outcomes/) |
| `kalku info formats` | Cómo reporta una corrida lo que encontró. Mira [Qué te dice una corrida](../report/) |
| `kalku info agents` | El ciclo para el que está hecho kalku, y las reglas que lo mantienen honesto. Mira [Para agentes de código](../agents/) |

## Opciones

| Opción | Qué hace |
|---|---|
| `--json` | Imprime el tema como JSON |
| `--snippet` | Imprime solo las líneas que un agente pega en `CLAUDE.md` |

```sh
kalku info spells --json
kalku info agents --snippet
```
