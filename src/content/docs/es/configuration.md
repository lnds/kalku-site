---
title: "Configuración"
description: "El archivo .kalku.toml, la carpeta .kalku/ y qué significa cada clave."
---

No hace falta configurar nada para medir: un proyecto sin `.kalku.toml` se mide con los valores por defecto. El archivo sirve para dejar kalku en el proyecto, con una configuración que el equipo comparte.

[`kalku init`](../init/) lo escribe por ti. Esto es lo que deja en un proyecto Elixir:

```toml
# Written by `kalku init`. Every key is optional; these are the ones that
# make a run work without arguments.
language = "elixir"

# The executable that speaks the kalku protocol for this language. It is
# a script in this project so that whatever its toolchain needs — a build
# path, an environment — is written down where it can be read.
summon = ".kalku/summon"

[run]
# One worker while a kalku has a single build path to give.
workers = 1

# A cast that runs longer than this is a `timeout`, not a slow test.
timeout_floor_ms = 60000

# A cast that holds more memory than this ends as `crashed`. Left out, it is a
# quarter of this machine shared between the workers; 0 means no ceiling.
# memory_limit_mb = 8192
```

## Todas las claves

`.kalku.toml` va en la raíz del proyecto y todas sus claves son opcionales. Una clave presente pero incorrecta es un error que nombra la clave: la corrida no mide y sale con código `2`.

```toml
[run]
workers = 8
spells = ["arm", "compare", "connect", "negate", "literal", "call"]
exclude = ["lib/my_app_web/telemetry.ex"]
exclude_calls = ["Logger.*", ":telemetry.execute", "IO.inspect"]
timeout_floor_ms = 500
memory_limit_mb = 8192

[score]
threshold = 0.80
ratchet = true
```

| Clave | Qué hace |
|---|---|
| `language` | El lenguaje del proyecto. `init` lo detecta por los marcadores del proyecto |
| `summon` | El ejecutable que habla el protocolo de kalku para ese lenguaje. `init` escribe un script, `.kalku/summon`, para que lo que el toolchain necesite quede a la vista |
| `reni` | Dónde van los artefactos de una corrida. Si no lo pones, kalku los deja bajo el directorio temporal de la máquina, fuera del proyecto. El archivo se comparte: una ruta de una máquina no significa nada en otra |
| `run.workers` | Cuántos kalku trabajan en paralelo. En un proyecto Elixir es uno, porque hay una sola ruta de build |
| `run.spells` | Los [spells](../spells/) que se lanzan. Un nombre desconocido es un error |
| `run.exclude` | Archivos que no se miden |
| `run.exclude_calls` | Llamadas que no se pueden observar por diseño, como un log o la telemetría. No se proponen sites dentro de ellas |
| `run.timeout_floor_ms` | El piso del timeout de un cast. Pasado el timeout, el resultado es `timeout`, no un test lento |
| `run.memory_limit_mb` | El techo de memoria de un cast, por kalku. Por defecto, un cuarto de la máquina repartido entre los workers; `0` lo desactiva. Un wekufe que lo pasa termina como `crashed` |
| `score.threshold` | El piso del puntaje global. Un shard no queda sujeto a él |
| `score.ratchet` | Con `true`, el puntaje del proyecto completo no puede bajar de la línea base guardada con `kalku run --all --store-baseline` |

Una tabla con el nombre de un lenguaje no es asunto de kalku: se le entrega tal cual al kalku de ese lenguaje.

## La carpeta .kalku/

| Archivo | Qué es |
|---|---|
| `.kalku/summon` | El script que inicia el kalku del proyecto. Recibe el reni como primer argumento |
| `.kalku/equivalent` | Los [mutantes equivalentes](../equivalents/) declarados, cada uno con su razón |
| `.kalku/equivalent.proposed` | Las propuestas que todavía nadie aceptó. kalku las lee, pero nunca las aplica |
| `.kalku/baseline.json` | La línea base del ratchet: los dos conteos de los que sale un puntaje, `killed` y `survived` |

Ampliar `exclude` o `exclude_calls`, o agregar entradas a `.kalku/equivalent`, es esconder hoyos. Por eso las supresiones que agrega un pull request aparecen bajo su propio encabezado en cada reporte.
