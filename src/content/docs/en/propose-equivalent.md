---
title: "kalku propose-equivalent"
description: "Proposes a wekufe as equivalent, with its reason; kalku accept and kalku reject are a person's answer."
---

Proposes that a wekufe cannot be told apart from the original. The proposal carries a written reason and is not applied by itself: a person has to accept it.

```sh
kalku propose-equivalent <wekufe> --reason <why>
```

The proposal goes to `.kalku/equivalent.proposed`, which kalku reads but never applies. `.kalku/equivalent` is not touched.

## Accept or reject

```sh
kalku accept <wekufe> [--reason <why>]
kalku reject <wekufe> [--reason <why>]
```

| Command | What it does |
|---|---|
| `kalku accept` | Takes a proposal into `.kalku/equivalent` |
| `kalku reject` | Turns it down: the wekufe wants a test again |

A person answers one proposal at a time, and says so by name. There is deliberately no way to answer them all at once: the point of an agent proposing and a person accepting is that each suppression was read by someone.

## Where to put the proposals

Proposals go where someone reads them before they count: a pull request rather than a commit to the main branch. The report lists what a change suppressed, which is worth nothing if nobody is reading the change.

[Equivalent mutants](../equivalents/) explains when a wekufe is equivalent and when it is simply a missing test.
