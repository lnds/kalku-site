---
title: "Equivalent mutants"
description: "What to do with a wekufe no test can kill: the .kalku/equivalent file and why an agent can only propose."
---

Deciding whether two programs are equivalent is undecidable in general, so no tool finds every equivalent wekufe. kalku avoids generating the predictable ones and makes declaring the rest honest and durable.

## Three kinds of survivor

| Kind | Example | Treatment |
|---|---|---|
| **Equivalent** | `i >= 0` → `i > 0` where `i` is never 0 at that point | Declared, with a reason |
| **Unobservable by design** | Dropping `Logger.debug/1`, `:telemetry.execute/3`, or a cache that exists only for speed | Excluded by configuration (`exclude_calls`), never entry by entry |
| **Hard to kill, but real** | An edge case no test exercises | A hole: write the test, do not suppress |

Keeping unobservable calls out of the equivalent file keeps that file small enough to audit.

## The .kalku/equivalent file

Equivalents are declared in `.kalku/equivalent`, committed with the project. Entries are keyed by meaning, not by line number, so they survive edits elsewhere in the file:

```
lib/my_app/parser.ex  MyApp.Parser.next_token/2  compare  ">="  #1   # index is always even here; > and >= agree
```

The fields are: the file, the enclosing function, the spell, the original text (as a JSON string), the ordinal of that text within the function, and the reason after `#`.

- An entry without a reason is an error.
- An entry that matches no site is an error: an orphan either suppresses nothing or, worse, would end up suppressing a different wekufe than the one justified. The run does not measure and exits `2`.
- The file suppresses; it does not excuse. A wekufe that survives because a test is missing belongs in a test, not here.

## Propose, accept, reject

An equivalence argument cannot be verified; a test that kills can. So the first stays a proposal until a person reads it.

```sh
kalku propose-equivalent <wekufe> --reason "index is always even here"
kalku accept <wekufe>
kalku reject <wekufe>
```

`propose-equivalent` appends the proposal to `.kalku/equivalent.proposed`, which kalku reads but never applies. `accept` takes it into `.kalku/equivalent`; `reject` turns it down, and the wekufe wants a test again.

A person answers one proposal at a time, and says so by name. There is deliberately no way to accept them all at once: the point of an agent proposing and a person accepting is that each suppression was read by someone.

## Suppressions are loud

The suppressions a pull request adds, whether new entries in `.kalku/equivalent` or a wider `exclude` or `exclude_calls`, appear under their own heading in every report. Hiding a hole must be as visible as leaving one.
