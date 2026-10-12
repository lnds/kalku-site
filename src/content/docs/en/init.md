---
title: "kalku init"
description: "Keeps kalku in a project: detects the language and writes .kalku.toml and .kalku/summon."
---

Sets a project up: it detects its language and writes `.kalku.toml` and the `.kalku/summon` script.

```sh
kalku init [dir] [options]
```

It is not needed to measure: a project without a `.kalku.toml` is measured as it is. `init` is for keeping kalku in the project, with a configuration the team shares.

## What it does

It reads the project's own markers, says what it found and asks before writing. This is its output in an Elixir project, with `--yes`:

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

The marker decides the language:

| Marker | Language |
|---|---|
| `mix.exs` | Elixir |
| `Cargo.toml` | Rust |
| `pyproject.toml` | Python |
| `pom.xml`, or the Gradle files | Java |
| `kai.toml` | kaikai |

## What it never does

- It never writes over a file that is there.
- It never edits the build file that decides what a project depends on: it prints the line to add and says why.

In an Elixir project, after adding that line to `deps`:

```sh
mix deps.get
kalku run lib/thing.ex
```

## Options

| Option | What it does |
|---|---|
| `--lang <name>` | The project's language, when `init` should not guess |
| `-y`, `--yes` | Do not ask before writing |

[Configuration](../configuration/) explains the file it leaves.
