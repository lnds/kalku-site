---
title: "kalku propose-equivalent"
description: "Propone un wekufe como equivalente, con su razón; kalku accept y kalku reject son la respuesta de una persona."
---

Propone que un wekufe no se puede distinguir del original. La propuesta lleva una razón escrita y no se aplica sola: una persona tiene que aceptarla.

```sh
kalku propose-equivalent <wekufe> --reason <why>
```

La propuesta queda en `.kalku/equivalent.proposed`, que kalku lee pero nunca aplica. `.kalku/equivalent` no se toca.

## Aceptar o rechazar

```sh
kalku accept <wekufe> [--reason <why>]
kalku reject <wekufe> [--reason <why>]
```

| Comando | Qué hace |
|---|---|
| `kalku accept` | Pasa una propuesta a `.kalku/equivalent` |
| `kalku reject` | La rechaza: el wekufe vuelve a pedir un test |

Una persona responde una propuesta a la vez, y la nombra. A propósito, no hay forma de responderlas todas juntas: el sentido de que un agente proponga y una persona acepte es que alguien leyó cada supresión.

## Dónde poner las propuestas

Las propuestas van donde alguien las lea antes de que cuenten: en un pull request, no en un commit a la rama principal. El reporte lista lo que un cambio suprimió, y eso no vale nada si nadie está leyendo el cambio.

[Mutantes equivalentes](../equivalents/) explica cuándo un wekufe es equivalente y cuándo es simplemente un test que falta.
