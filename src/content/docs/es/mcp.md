---
title: "Servidor MCP"
description: "kalku mcp sirve las cuatro herramientas para agentes por stdio: cómo instalarlo en tu host y qué hace cada una."
---

`kalku mcp` sirve las cuatro herramientas para agentes por stdio, de modo que un agente de código puede medir, volver a lanzar y leer un wekufe sin pasar por la shell. No recibe argumentos ni lee configuración propia: el proyecto es aquel en el que el host está trabajando, o el `root` que nombre una llamada.

## Instalarlo

Claude Code:

```sh
claude mcp add kalku -- kalku mcp
```

Cursor, Windsurf, Zed, Claude Desktop y cualquier otro que lea un bloque `mcpServers`:

```json
{
  "mcpServers": {
    "kalku": {
      "command": "kalku",
      "args": ["mcp"]
    }
  }
}
```

`kalku` tiene que estar en el `PATH` con el que arranca el host, que no siempre es el de tu shell: una aplicación gráfica en macOS no lee tu perfil. Si el host no lo encuentra, entrégale la ruta absoluta que muestra `which kalku`.

## Las herramientas

| Herramienta | Qué hace |
|---|---|
| `kalku_run` | Mide y devuelve los sobrevivientes en el formato agent |
| `kalku_cast` | Vuelve a lanzar wekufe y devuelve sus resultados |
| `kalku_show` | El detalle completo de un wekufe |
| `kalku_propose_equivalent` | Escribe una **propuesta** para que la revise una persona; nunca se aplica sola |

A propósito, no existe ninguna herramienta que suprima, excluya o ignore algo. Mira los resguardos en [Para agentes de código](../agents/).

## Acota kalku_run

`kalku_run` ejecuta la suite del proyecto muchas veces y toma minutos, así que apúntalo a uno o dos archivos y no a todo. Acepta el mismo acotamiento que la línea de comandos:

- `since`, una referencia de git, mide solo las líneas cambiadas desde ella y no necesita que nombres archivos.
- `limit` fija cuántos wekufe se lanzan como máximo: 100 si no dices otra cosa, y todos cuando hay `since`.

## Progreso y cancelación

Un host que pide enterarse de una llamada, entregándole un `progressToken`, recibe cómo va la corrida mientras avanza: cada etapa y cuántos wekufe se han lanzado. Sin eso una corrida calla por minutos, y un host la da por muerta.

Un host que cancela una corrida (`notifications/cancelled`) la termina y sigue siendo atendido. Si cierra el pipe mientras una corrida está en curso, la corrida también termina, y el servidor con ella; lo mismo pasa con SIGTERM. En todos los casos los kalku se despiden.

Un script que maneje `kalku mcp` mantiene su extremo abierto hasta leer la respuesta.
