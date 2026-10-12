---
title: "How it works"
description: "The four stages of a run: baseline, plan, cast and report, and why warm workers are the point."
---

```
             kaikai side                          kalku
  ┌───────────────────────────────┐     ┌──────────────────────┐
  │ plan · schedule · cache       │────►│ kalku[elixir] × N    │  warm BEAM nodes,
  │ score · report · gate CI      │◄────│ kalku[kaikai]        │  project loaded once
  └───────────────────────────────┘     └──────────────────────┘
                  versioned NDJSON protocol
```

kalku has two halves. The core, written in [kaikai](https://kaikai-lang.org/), plans, schedules, scores and reports. The **kalku** are workers bound to one language: each knows how to break code in its own and nothing else. They talk over a versioned NDJSON protocol.

## The four stages

1. **Baseline.** Run the suite once and record which tests cover which lines. A test that already fails judges nothing, so the run goes on without it and names it in every report, beside a score that is then of the tests that pass; such a run exits `2`. If nothing passes, stop.
2. **Plan.** Find the places where each spell applies, using the language's own parser rather than regexes. Skip lines no test covers and mutants declared equivalent.
3. **Cast.** Load each wekufe into a warm kalku and run only the tests that cover it. Stop at the first failing test.
4. **Report.** List the survivors first. The score comes after as context. Timeouts and crashes are reported separately and never counted as kills.

## Warm workers

Warm workers are the point. A timeout is aborted inside the running VM, and a worker is restarted only when it stops responding. A timeout escalates in three steps: `abort`, `reset` and, only at the end, killing the process.

After the first run, a warm session only re-casts what changed. [`kalku serve`](../serve/) keeps that session between one run and the next.

## A memory ceiling

A timeout bounds time, but a wekufe can take the machine well inside it: a loop turned into unbounded growth allocates faster than its deadline passes.

So a cast also has a memory ceiling (`memory_limit_mb`; by default a quarter of the machine shared between the workers). A wekufe that allocates without limit ends as `crashed` instead of taking the machine, and what the kalku started is ended with it. It is never a kill: no assertion failed.

## Your working tree is never touched

Wekufe live and die in the **reni**, an isolated workspace under the machine's temporary directory. No wekufe is ever written to your working tree.

## Going further

The reference documentation of the project is in the repository:

- [`docs/design.md`](https://github.com/lnds/kalku/blob/main/docs/design.md): architecture, the lifecycle of a run, outcomes and score, spells, equivalent mutants, CI, distribution.
- [`docs/protocol.md`](https://github.com/lnds/kalku/blob/main/docs/protocol.md): the kalku and client protocols.
