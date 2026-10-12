---
title: "In CI"
description: "Gate a pull request on the holes it introduced with --since, and the global score with a nightly run."
---

A pull request is gated on what **it** introduced, not on a global score that punishes whoever touches a file with old debt:

```sh
kalku run --since origin/main
```

That measures only the lines the change touched, and exits `1` when it introduced a hole: a wekufe that survived on one of those lines, or code on one that no test reaches at all. Old debt elsewhere in the same file does not block it.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Measured; nothing to report |
| `1` | Measured, and your tests have holes: survivors on changed lines, sites on changed lines that no test reaches, or a score below the threshold or the baseline |
| `2` | kalku could not measure: tests that fail before anything is cast, a failed `prepare`, an orphan entry in `.kalku/equivalent`, a config error |

*"Your tests have holes"* and *"kalku could not measure"* are different failures, and CI must be able to tell them apart. `2` is also what you get when git cannot tell what changed: a gate that read that as *"nothing changed"* would pass every pull request it could not read.

## Where it is measured from

The change is measured from where the branch left `origin/main`, and the working tree counts, so a change still being written is judged the way it will be committed.

A CI checkout needs enough history to find that point. On GitHub Actions, with kalku already installed on the runner:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- run: kalku run --since origin/${{ github.base_ref }} --format github
```

`--format github` emits workflow commands, so survivors appear on the diff.

## --limit and a change

A run asked about a change casts all of it. If you pass `--limit` and it cuts the change short, a clean result is not an answer, and the run exits `2` rather than passing over lines nobody looked at.

## The global score, at night

Measuring the whole project on every pull request does not scale. That is what `--all` and `--shard` are for:

```sh
kalku run --all --shard 1/4
```

`--all` measures every source file of the project, all of its wekufe. `--shard i/n` casts only part `i` of `n`: the same part on every machine, so `n` jobs cover a project between them. A shard says it is one and is not held to the threshold. Combining the reports of the shards (`merge`) is not implemented yet.

## The ratchet

With `ratchet = true` in the `[score]` section of [`.kalku.toml`](../configuration/), the score of the whole project may not drop below the stored baseline:

```sh
kalku run --all --store-baseline
```

- A run never writes the baseline unasked.
- Only the whole project is held to it. The score of named files, of a change (`--since`) or of a shard is of something else, and is not compared.
- No baseline is not a pass: a project that set the ratchet and stored nothing ends with exit `2` and the command that stores one.

## What is not there yet

`--watch`, `--ci` and `merge` are not implemented. [What works today](../status/) has the whole list.
