---
title: "For coding agents"
description: "The loop kalku is built for: find a survivor, write a test, re-cast, repeat."
---

Coding agents write tests fast, but a test can run a line without checking anything about it. Coverage can't catch that; mutation testing can. **Agents write tests fast; kalku tells them whether those tests test anything.**

People read one run and CI gates one run per pull request. An agent iterates: it finds a survivor, writes a test, checks whether the wekufe is dead, and repeats. kalku is built for that loop.

```sh
kalku run lib/thing.ex --format agent   # survivors as compact JSON, each with a hint
kalku cast <wekufe>                     # re-cast just that one, against a warm kalku
kalku info agents --snippet             # lines to paste into CLAUDE.md / AGENTS.md
```

## Everything needed to act, in one object

`--format agent` gives NDJSON: one line per survivor and one summary at the end. This is the example from kalku's design document:

```json
{"wekufe":"c1f3…","file":"lib/my_app/parser.ex","line":42,"enclosing":"MyApp.Parser.next_token/2",
 "spell":"compare","original":">=","replacement":">",
 "context":["defp next_token(s, i) when i >= 0 do","  case String.at(s, i) do"],
 "covering_tests":["test/my_app/parser_test.exs:18"],"covering_count":1,
 "hint":"No test tells i == 0 apart from i > 0. Add a case at the boundary i = 0."}
```

File, line, enclosing function, the change, the source around it, the tests that cover it, and a hint. `covering_tests` lists the first five tests that cover the line, and `covering_count` says how many there are; the full list is what `kalku show <wekufe>` answers.

Hints come from a fixed template per spell, not from a model.

## Guardrails

An agent optimising for dead wekufe can reach the number without closing holes, with no ill intent. kalku makes those shortcuts visible or impossible:

- **An agent can only *propose* an equivalent mutant**; a person has to accept it. See [Equivalent mutants](../equivalents/).
- **Suppressions are loud.** The ones a pull request adds appear under their own heading in every report.
- **A kill needs a test that passes on the original code.** A test that fails on both is a broken test, not a kill.
- **A timeout never counts as a kill.**

## The lines for your agent

`kalku info agents --snippet` prints the lines to paste into `CLAUDE.md` or `AGENTS.md`:

```
After writing or changing tests, run `kalku run <files> --format agent`
and close the survivors with tests that pass on the original code.
Never edit `.kalku/equivalent`, `exclude`, or `exclude_calls` to make a
survivor go away: propose an equivalent with a reason instead.
Put the proposals somewhere a person reads them before they take
effect — a pull request, not a commit to the main branch. A
suppression nobody read is a hole nobody knows about.
```

## Without shelling out

[`kalku mcp`](../mcp/) serves the same loop as four MCP tools, over stdio.
