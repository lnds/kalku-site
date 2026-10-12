---
title: "Mutantes equivalentes"
description: "Qué hacer con un wekufe que ningún test puede matar: el archivo .kalku/equivalent y por qué un agente solo puede proponer."
---

Decidir si dos programas son equivalentes es indecidible en general, así que ninguna herramienta encuentra todos los wekufe equivalentes. kalku evita generar los predecibles y hace que declarar el resto sea honesto y durable.

## Tres tipos de sobreviviente

| Tipo | Ejemplo | Qué se hace |
|---|---|---|
| **Equivalente** | `i >= 0` → `i > 0` donde `i` nunca es 0 en ese punto | Se declara, con una razón |
| **Inobservable por diseño** | Quitar `Logger.debug/1`, `:telemetry.execute/3` o un caché que existe solo por velocidad | Se excluye por configuración (`exclude_calls`), nunca entrada por entrada |
| **Difícil de matar, pero real** | Un caso de borde que ningún test ejercita | Es un hoyo: escribe el test, no lo suprimas |

Dejar las llamadas inobservables fuera del archivo de equivalentes lo mantiene lo bastante pequeño para auditarlo.

## El archivo .kalku/equivalent

Los equivalentes se declaran en `.kalku/equivalent`, que se versiona con el proyecto. Las entradas se identifican por significado y no por número de línea, así que sobreviven a ediciones en otra parte del archivo:

```
lib/my_app/parser.ex  MyApp.Parser.next_token/2  compare  ">="  #1   # index is always even here; > and >= agree
```

Los campos son: el archivo, la función que contiene el site, el spell, el texto original (como string JSON), el ordinal de ese texto dentro de la función, y la razón después de `#`.

- Una entrada sin razón es un error.
- Una entrada que no calza con ningún site es un error: una entrada huérfana no suprime nada o, peor, terminaría suprimiendo un wekufe distinto del que se justificó. La corrida no mide y sale con código `2`.
- El archivo suprime; no excusa. Un wekufe que sobrevive porque falta un test va en un test, no aquí.

## Proponer, aceptar, rechazar

Un argumento de equivalencia no se puede verificar; un test que mata, sí. Por eso lo primero se queda como propuesta hasta que una persona lo lee.

```sh
kalku propose-equivalent <wekufe> --reason "index is always even here"
kalku accept <wekufe>
kalku reject <wekufe>
```

`propose-equivalent` agrega la propuesta a `.kalku/equivalent.proposed`, que kalku lee pero nunca aplica. `accept` la pasa a `.kalku/equivalent`; `reject` la rechaza, y el wekufe vuelve a pedir un test.

Una persona responde una propuesta a la vez, y la nombra. A propósito, no hay forma de aceptarlas todas juntas: el sentido de que un agente proponga y una persona acepte es que alguien leyó cada supresión.

## Las supresiones hacen ruido

Las supresiones que agrega un pull request, sean entradas nuevas en `.kalku/equivalent` o un `exclude` o `exclude_calls` más amplio, aparecen bajo su propio encabezado en cada reporte. Esconder un hoyo tiene que ser tan visible como dejarlo.
