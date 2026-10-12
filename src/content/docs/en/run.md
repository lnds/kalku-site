---
title: "kalku run"
description: "Casts wekufe over some files and reports the survivors."
---

Measures the files you name: it casts wekufe over them, one at a time, and reports the ones no test caught.

```sh
kalku run [files...] [options]
```

```sh
kalku run lib/thing.ex                    # one file
kalku run lib/green.ex --limit 6 --verbose
kalku run --since origin/main             # only the lines the change touched
kalku run --all --shard 1/4               # the whole project, in parts
kalku run lib/thing.ex --format agent     # survivors as NDJSON
```

## Options

| Option | What it does |
|---|---|
| `--limit <n>` | Cast at most `n` wekufe: 100 by default, 0 for all of them. A run with `--since` casts the whole change unless told otherwise |
| `--since <ref>` | Measure only the lines changed since that git ref, and block when a wekufe survives on one of them |
| `--all` | Measure every source file of the project, all of its wekufe |
| `--shard <i/n>` | Cast only part `i` of `n`: the same part on every machine, so `n` jobs cover a project between them |
| `--store-baseline` | Store this run's score as the baseline `ratchet = true` holds later runs of the whole project to |
| `--format <name>` | `human` (the default), `agent`, `json`, or `github` |
| `-v`, `--verbose` | Say what the run is doing while it does it |

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Measured; nothing to report |
| `1` | Measured, and your tests have holes |
| `2` | kalku could not measure |

[In CI](../ci/) explains each one.

## What to read next

- [What a run tells you](../report/): how to read the report, and the formats.
- [Outcomes and score](../outcomes/): what each wekufe can come to.
- [In CI](../ci/): `--since`, `--all`, `--shard` and the ratchet.
