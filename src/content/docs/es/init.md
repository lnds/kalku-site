---
title: "kalku init"
description: "Deja kalku en un proyecto: detecta el lenguaje y escribe .kalku.toml y .kalku/summon."
---

Configura un proyecto: detecta su lenguaje y escribe `.kalku.toml` y el script `.kalku/summon`.

```sh
kalku init [dir] [options]
```

No hace falta para medir: un proyecto sin `.kalku.toml` se mide tal como está. `init` es para dejar kalku en el proyecto, con una configuración que el equipo comparte.

## Qué hace

Lee los marcadores propios del proyecto, dice lo que encontró y pregunta antes de escribir. Esta es su salida en un proyecto Elixir, con `--yes`:

```
kalku: this looks like elixir (mix.exs is here)

It will write:
  ./.kalku.toml     how a run is set up
  ./.kalku/summon   how this project's kalku is summoned
  mix.exs            this line in `deps`, so the kalku can be summoned:
                        {:kalku_elixir, "~> 0.1", only: :test, runtime: false}

  wrote   ./.kalku.toml
  wrote   ./.kalku/summon
```

El marcador decide el lenguaje:

| Marcador | Lenguaje |
|---|---|
| `mix.exs` | Elixir |
| `Cargo.toml` | Rust |
| `pyproject.toml` | Python |
| `pom.xml`, o los archivos de Gradle | Java |
| `kai.toml` | kaikai |

## Lo que nunca hace

- Nunca escribe sobre un archivo que ya existe.
- Nunca edita el archivo de build que decide de qué depende un proyecto: imprime la línea que hay que agregar y explica por qué.

En un proyecto Elixir, después de agregar esa línea a `deps`:

```sh
mix deps.get
kalku run lib/thing.ex
```

## Opciones

| Opción | Qué hace |
|---|---|
| `--lang <name>` | El lenguaje del proyecto, cuando `init` no debe adivinarlo |
| `-y`, `--yes` | No pregunta antes de escribir |

[Configuración](../configuration/) explica el archivo que deja.
