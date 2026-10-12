---
title: "What works today"
description: "kalku is pre-alpha: which pieces are done and which are not yet."
---

kalku is **pre-alpha**. Everything this documentation describes runs today, except what this page marks as pending. The table comes from the README of the [repository](https://github.com/lnds/kalku), which is where it is updated first.

## Not yet

| Piece | State |
|---|---|
| Parallel workers in an Elixir project (one build path, so one worker) | not yet |
| `--watch` and `--ci` | not yet |
| `merge`: combining sharded reports | not yet |
| macOS on Intel, Linux on arm64 (waiting on a kaikai toolchain for them) | not yet |

## Commands and core

| Piece | State |
|---|---|
| **`kalku init`**: detects the language, writes `.kalku.toml` and the summoning script | done |
| **`kalku run <files>`**: measures those files and reports survivors | done |
| **`kalku cast <wekufe>`**: re-cast one wekufe, and `kalku show` to read it back | done |
| **`kalku propose-equivalent`**: an agent proposes, a person accepts | done |
| **`kalku info`**: spells, outcomes, formats and the agent loop, in the binary | done |
| **`kalku mcp`**: the four agent tools, over stdio | done |
| **`kalku serve`**: the client protocol on a `0600` Unix socket, streaming a run as it happens | done: one client at a time |
| **Warm sessions**: the pool a project was measured with survives the run, and is replaced when the project changes | done |
| **Protocol**: both directions, canonical NDJSON, fixtures for every message | done |
| **Core**: planner, test selection, outcomes, score, gate, equivalents, `.kalku.toml`, sharding, changed lines | done |
| **Reports**: human, JSON, GitHub annotations, and `agent` NDJSON with per-spell hints | done |
| **Orchestrator**: kalku pool, scheduler, timeout escalation (abort → reset → kill), restart budget, cancellation | done |
| **`--since <ref>`**: measure what a change touched, and block on holes it introduced | done |
| **`[score] ratchet`**: the score of the whole project may not drop below the baseline stored with `--store-baseline` | done |
| **`--all` and `--shard i/n`**: the whole project, in parts, for a nightly run | done: a shard says it is one and is not held to the threshold |

## The kalku of each language

| Piece | State |
|---|---|
| **Elixir kalku**: sites, `prepare`, `baseline` with per-test coverage, `cast`, `abort`, `reset`, `reload` | done: every protocol message but `delegate` |
| **kaikai kalku**: the one kalku measures itself with | done |
| **Rust kalku**: sites for `arm`, `compare`, `connect`, `negate`, `literal` from `syn`, behind the kalku protocol | done: finds sites |
| Rust kalku: `prepare`, `baseline` and `cast` in the reni, `abort`, per-test coverage with LLVM | done |
| Rust kalku: `kalku init` for Cargo projects, shipped in the release | done |
| **Python kalku**: sites from `ast`, `prepare`/`baseline`/`cast` in forked children, `abort`, per-test coverage with `sys.monitoring`, `kalku init`, shipped in the release | done |
| **Java kalku**: sites for `arm`, `compare`, `connect`, `negate`, `literal`, `call` from `javac`, behind the kalku protocol, on Java 11, 17, 21 and 25 | done: finds sites |
| Java kalku: `prepare`, `baseline` and `cast` in the reni for a Maven project | done |
| Java kalku: `kalku init` for Maven and Gradle projects, shipped in the release | done |
| Java kalku: `abort`, by ending the JVM the tests run in | done |
| Java kalku: per-test coverage, counted by JaCoCo and withheld wherever it cannot be trusted | done |
| Java kalku: Maven projects of several modules; a site is judged by the tests of every module that uses its own | done |
| Java kalku: Gradle builds, asked by running them with a script added from outside the project | done |
| Java kalku: projects that test with JUnit 4 or with TestNG, run through their JUnit Platform engines | done |
| **Per-test coverage used by a run**: a wekufe is cast against the tests that reach it | done: Elixir, Rust, Python, Java |

## Distribution

| Piece | State |
|---|---|
| **`kalku_elixir` on Hex**: the Elixir kalku installs like any dependency | done |
| **Release binaries**: `brew install`, or a tarball per platform, built and checksummed by CI | done |

## kalku measured by kalku

kalku uses kalku to test its own code: it casts wekufe in its own sources through the kaikai kalku and reports what its suite did not notice. This is a report of that run:

```
kalku/core/shard.kai:30  literal  shard.wrap32/1
  - 4294967296
  + 0
  covered by 189 tests
  No test depends on the exact value `4294967296` in `shard.wrap32/1`.

score 40% · 2 killed · 3 survived · 1 compile error
```
