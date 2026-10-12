---
title: "kalku cast"
description: "Vuelve a lanzar un wekufe después de escribir un test, para saber si ya murió."
---

Vuelve a lanzar los wekufe que nombras, y solo esos. Es el paso del ciclo que responde la pregunta *«¿el test que acabo de escribir lo mata?»*.

```sh
kalku cast <wekufe>
```

## El nombre de un wekufe

Un wekufe se nombra por el texto en el que fue lanzado, así que editar su archivo lo renombra. Volver a lanzar un nombre antiguo te lo dice, y un nuevo `kalku run` entrega los nuevos.

En el formato `agent`, el nombre viene en el campo `wekufe` de cada sobreviviente.

## Solo cuenta un test que pasa en el original

Un test solo cuenta como que mató a un wekufe si pasa en el código original. Un test que falla en ambos es un test roto, no un kill: no se puede matar un wekufe con un test roto.

## Contra un kalku caliente

Con [`kalku serve`](../serve/) corriendo, `cast` lanza contra un kalku caliente y no vuelve a preparar el proyecto.
