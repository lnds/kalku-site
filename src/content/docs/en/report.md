---
title: "What a run tells you"
description: "How to read the report: survivors first, the score after, and the four output formats."
---

```sh
kalku run lib/green.ex --limit 6 --verbose
```

```
lib/green.ex:4  compare  Green.classify/1
  - >=
  + >
  covered by 4 tests
  No test tells `>=` apart from `>` in `Green.classify/1`. Add a case at the boundary where the two sides are equal.

score 60% · 3 killed · 2 survived · 1 compile error
```

## A survivor, line by line

| Line | What it says |
|---|---|
| `lib/green.ex:4  compare  Green.classify/1` | The file and the line, the [spell](../spells/) that made the wekufe and the function it is in |
| `- >=` and `+ >` | The change, as a diff: what was there and what the wekufe put in its place |
| `covered by 4 tests` | How many tests reach that line. The wekufe was cast against those tests and none noticed |
| `No test tells…` | The hint: which test is missing. It comes from a fixed template per spell, not from a model |

Survivors come first and the score comes after, because the survivor is the thing you can act on.

`covered by 4 tests` is not decoration: the baseline records which tests reach which lines, and a wekufe is cast against those tests alone. A site no test reaches is `no_coverage`, never a kill; and neither is a timeout, a crash, or a wekufe that did not compile.

## The score

```
score 60% · 3 killed · 2 survived · 1 compile error
```

The score is `killed / (killed + survived)` and nothing else moves it: here, 3 out of 5. The wekufe that did not compile is counted beside it, not inside it. [Outcomes and score](../outcomes/) explains each outcome.

## Read a wekufe back

A wekufe is named by the text it was cast in, so editing its file renames it; re-casting an old name says so, and a new `kalku run` gives the new ones.

```sh
kalku show <wekufe>            # site, diff, covering tests, hint, history
kalku cast <wekufe>            # re-cast just that one
kalku info outcomes            # what each outcome means
```

## Formats

`--format` chooses how a run is reported. This is what `kalku info formats` answers:

| Format | What it gives |
|---|---|
| `human` | The default: survivors first, each with file, line, spell, diff and a hint. The score is context, printed last |
| `agent` | NDJSON: one line per survivor and one summary. Each line carries everything needed to act without opening a file. See [For coding agents](../agents/) |
| `json` | The whole report as one object |
| `github` | Workflow commands, so survivors appear on the diff. See [In CI](../ci/) |
