---
title: "Medir un proyecto"
description: "La primera corrida, sin configurar nada, y cómo dejar kalku instalado en un proyecto con kalku init."
---

Desde la raíz del proyecto, sin configurar nada:

```sh
kalku run lib/thing.ex        # measure one file
```

Un proyecto sin `.kalku.toml` se mide tal como está y se deja tal como está. La corrida lo dice, y dice dónde guarda lo que necesita:

```
kalku: no .kalku.toml in this directory: measuring it as elixir and leaving it as it is. What the run keeps is in $TMPDIR/kalku/thing; `kalku init` sets the project up to keep it.
```

Ese lugar es el **reni**, bajo el directorio temporal de tu máquina (aquí escrito como `$TMPDIR`; el mensaje real muestra la ruta completa). No se escribe nada en el proyecto: ni su `mix.exs`, ni su `mix.lock`, ni un archivo junto a ellos.

El kalku de Elixir corre *dentro* del proyecto que mide: así es como carga un wekufe en una BEAM caliente en vez de recompilar. Para un proyecto que no depende de él, la corrida descarga `kalku_elixir` desde Hex al reni, en su misma versión, y lo compila ahí con el Elixir del proyecto.

## Empieza con un archivo y un límite

La primera corrida sobre un proyecto completo, en una base de código real, es larga, y no enseña nada que un solo archivo no muestre ya.

```sh
kalku run lib/thing.ex --limit 6 --verbose
```

`--limit` fija cuántos wekufe se lanzan como máximo (100 si no dices otra cosa, 0 para todos) y `--verbose` va contando qué hace la corrida mientras lo hace. [Qué te dice una corrida](../report/) explica cómo leer el resultado.

## Dejar kalku en el proyecto

Para dejar kalku en un proyecto, con una configuración que el equipo comparte, equivalentes que se argumentan y se registran, y un control en CI, configúralo:

```sh
kalku init                    # detects Elixir, writes .kalku.toml and .kalku/summon
mix deps.get
```

`init` lee los marcadores propios del proyecto (`mix.exs`, `kai.toml`, `Cargo.toml`, `pyproject.toml`, `pom.xml` o los archivos de Gradle), dice lo que encontró, y escribe `.kalku.toml` más un script `.kalku/summon` con lo que el toolchain necesite para iniciar el kalku con un canal de protocolo limpio.

Nunca escribe sobre un archivo que ya existe, y nunca edita el archivo de build que decide de qué depende un proyecto: imprime la línea que hay que agregar y explica por qué. La página de [`kalku init`](../init/) muestra su salida completa, y [Configuración](../configuration/), el archivo que deja.
