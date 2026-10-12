---
title: "Configuration"
description: "The .kalku.toml file, the .kalku/ folder and what each key means."
---

Nothing has to be configured to measure: a project without a `.kalku.toml` is measured with the defaults. The file is there to keep kalku in the project, with a configuration the team shares.

[`kalku init`](../init/) writes it for you. This is what it leaves in an Elixir project:

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

## Every key

`.kalku.toml` goes at the root of the project and every key in it is optional. A key that is present but wrong is an error that names the key: the run does not measure and exits `2`.

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

| Key | What it does |
|---|---|
| `language` | The language of the project. `init` detects it from the project's markers |
| `summon` | The executable that speaks the kalku protocol for that language. `init` writes a script, `.kalku/summon`, so whatever the toolchain needs is written down where it can be read |
| `reni` | Where the artefacts of a run go. Left out, kalku puts them under the machine's temporary directory, outside the project. The file is shared: a path from one machine means nothing on another |
| `run.workers` | How many kalku work in parallel. In an Elixir project it is one, because there is a single build path |
| `run.spells` | The [spells](../spells/) that are cast. An unknown name is an error |
| `run.exclude` | Files that are not measured |
| `run.exclude_calls` | Calls that are unobservable by design, such as a log or telemetry. No site is proposed inside them |
| `run.timeout_floor_ms` | The floor of a cast's timeout. Past the timeout, the outcome is `timeout`, not a slow test |
| `run.memory_limit_mb` | The memory ceiling of a cast, per kalku. By default, a quarter of the machine shared between the workers; `0` turns it off. A wekufe that goes past it ends as `crashed` |
| `score.threshold` | The floor of the global score. A shard is not held to it |
| `score.ratchet` | With `true`, the score of the whole project may not drop below the baseline stored with `kalku run --all --store-baseline` |

A table named after a language is not kalku's business: it is handed to that language's kalku as it stands.

## The .kalku/ folder

| File | What it is |
|---|---|
| `.kalku/summon` | The script that starts the project's kalku. It gets the reni as its first argument |
| `.kalku/equivalent` | The declared [equivalent mutants](../equivalents/), each with its reason |
| `.kalku/equivalent.proposed` | The proposals nobody has accepted yet. kalku reads them, but never applies them |
| `.kalku/baseline.json` | The baseline of the ratchet: the two counts a score is made of, `killed` and `survived` |

Widening `exclude` or `exclude_calls`, or adding entries to `.kalku/equivalent`, is hiding holes. That is why the suppressions a pull request adds appear under their own heading in every report.
