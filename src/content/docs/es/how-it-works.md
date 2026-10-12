---
title: "Cómo funciona"
description: "Las cuatro etapas de una corrida: línea base, plan, cast y reporte, y por qué los workers calientes son el punto."
---

```
             kaikai side                          kalku
  ┌───────────────────────────────┐     ┌──────────────────────┐
  │ plan · schedule · cache       │────►│ kalku[elixir] × N    │  warm BEAM nodes,
  │ score · report · gate CI      │◄────│ kalku[kaikai]        │  project loaded once
  └───────────────────────────────┘     └──────────────────────┘
                  versioned NDJSON protocol
```

kalku tiene dos mitades. El núcleo, escrito en [kaikai](https://kaikai-lang.org/), planifica, agenda, calcula el puntaje y reporta. Los **kalku** son workers ligados a un lenguaje: cada uno sabe romper código en el suyo y nada más. Se hablan por un protocolo NDJSON versionado.

## Las cuatro etapas

1. **Línea base.** Corre la suite una vez y registra qué tests cubren qué líneas. Un test que ya falla no juzga nada, así que la corrida sigue sin él y lo nombra en cada reporte, junto a un puntaje que entonces es de los tests que pasan; esa corrida termina con código `2`. Si ningún test pasa, se detiene.
2. **Plan.** Encuentra los lugares donde aplica cada spell, usando el parser propio del lenguaje y no expresiones regulares. Se salta las líneas que ningún test cubre y los mutantes declarados equivalentes.
3. **Cast.** Carga cada wekufe en un kalku caliente y corre solo los tests que lo cubren. Se detiene en el primer test que falla.
4. **Reporte.** Lista primero los sobrevivientes. El puntaje viene después, como contexto. Los timeouts y las caídas se reportan aparte y nunca se cuentan como kills.

## Workers calientes

Los workers calientes son el punto. Un timeout se aborta dentro de la VM en ejecución, y un worker se reinicia solo cuando deja de responder. El escalamiento de un timeout tiene tres pasos: `abort`, `reset` y, recién al final, matar el proceso.

Después de la primera corrida, una sesión caliente solo vuelve a lanzar lo que cambió. [`kalku serve`](../serve/) conserva esa sesión entre una corrida y la siguiente.

## Un techo de memoria

Un timeout acota el tiempo, pero un wekufe puede llevarse la máquina mucho antes: un ciclo convertido en crecimiento sin límite asigna memoria más rápido de lo que vence su plazo.

Por eso un cast también tiene un techo de memoria (`memory_limit_mb`; por defecto, un cuarto de la máquina repartido entre los workers). Un wekufe que asigna memoria sin límite termina como `crashed` en vez de llevarse la máquina, y lo que el kalku inició termina con él. Nunca es un kill: ningún assert falló.

## Tu árbol de trabajo no se toca

Los wekufe viven y mueren en el **reni**, un espacio de trabajo aislado bajo el directorio temporal de la máquina. Ningún wekufe se escribe jamás en tu árbol de trabajo.

## Para ir más lejos

La documentación de referencia del proyecto está en inglés, en el repositorio:

- [`docs/design.md`](https://github.com/lnds/kalku/blob/main/docs/design.md): arquitectura, ciclo de vida de una corrida, resultados y puntaje, spells, mutantes equivalentes, CI, distribución.
- [`docs/protocol.md`](https://github.com/lnds/kalku/blob/main/docs/protocol.md): los protocolos de kalku y de cliente.
