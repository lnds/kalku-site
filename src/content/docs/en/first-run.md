---
title: "Measure a project"
description: "The first run, with nothing set up, and how to keep kalku in a project with kalku init."
---

From the root of the project, with nothing set up:

```sh
kalku run lib/thing.ex        # measure one file
```

A project without a `.kalku.toml` is measured as it is and left as it is. The run says so, and says where it keeps what it needs:

```
kalku: no .kalku.toml in this directory: measuring it as elixir and leaving it as it is. What the run keeps is in $TMPDIR/kalku/thing; `kalku init` sets the project up to keep it.
```

That place is the **reni**, under the temporary directory of your machine (written here as `$TMPDIR`; the real message shows the whole path). Nothing is written in the project: not its `mix.exs`, not its `mix.lock`, not a file beside them.

The Elixir kalku runs *inside* the project it measures: that is how it loads a wekufe into a warm BEAM instead of rebuilding. For a project that does not depend on it, the run fetches `kalku_elixir` from Hex into the reni, in its own version, and builds it there with the project's Elixir.

## Start with one file and a limit

A first whole-project run on a real codebase is long, and there is nothing to learn from it that a single file does not already show.

```sh
kalku run lib/thing.ex --limit 6 --verbose
```

`--limit` caps how many wekufe are cast (100 unless told otherwise, 0 for all of them) and `--verbose` says what the run is doing while it does it. [What a run tells you](../report/) explains how to read the result.

## Keep kalku in the project

To keep kalku in a project, with a configuration the team shares, equivalents that are argued and recorded, and a gate in CI, set it up:

```sh
kalku init                    # detects Elixir, writes .kalku.toml and .kalku/summon
mix deps.get
```

`init` reads the project's own markers (`mix.exs`, `kai.toml`, `Cargo.toml`, `pyproject.toml`, `pom.xml` or the Gradle files), says what it found, and writes `.kalku.toml` plus a `.kalku/summon` script holding whatever the toolchain needs to start the kalku with a clean protocol channel.

It never writes over a file that is there, and it never edits the build file that decides what a project depends on: it prints the line to add and says why. The page of [`kalku init`](../init/) shows its whole output, and [Configuration](../configuration/) the file it leaves.
