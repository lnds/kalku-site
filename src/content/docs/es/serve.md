---
title: "Mantenlo caliente"
description: "kalku serve conserva los kalku con los que se midió un proyecto, para que la siguiente corrida lance sobre uno caliente."
---

Una corrida gasta la mayor parte de su tiempo preparando el proyecto. `kalku serve` conserva los kalku con los que se midió un proyecto, de modo que la siguiente corrida lanza sobre uno caliente:

```sh
kalku serve                    # a 0600 Unix socket, streaming a run as it happens
```

Atiende el protocolo de cliente en un socket Unix con permisos `0600`, y transmite una corrida mientras ocurre.

## Cuándo se descarta el pool

El pool se descarta en el momento en que cambia cualquier archivo de código o de tests: medir con un kalku que tiene el código de ayer es medir el código de ayer.

## Un cliente a la vez

`kalku serve` atiende a un cliente a la vez.

## Qué significa «caliente» en cada lenguaje

En Elixir, un kalku caliente es un nodo BEAM con el proyecto cargado una sola vez: un wekufe se carga en memoria en vez de recompilar. En los lenguajes que compilan a código nativo, como Rust y kaikai, un binario de tests no se puede recargar en caliente; ahí lo que se conserva caliente es el directorio de build en el reni. [Lenguajes](../languages/) tiene el detalle de cada uno.
