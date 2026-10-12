---
title: "Spells"
description: "The kinds of defect kalku casts, what each one simulates and the forms it takes in each language."
---

A **spell** (or *kalkutun*, the harm a kalku works) is a kind of defect. Each wekufe is your program with exactly one spell cast in one place.

The binary documents them:

```sh
kalku info spells
```

## The catalog

These six are the ones a run casts unless told otherwise, in order of diagnostic value:

| Spell | What it does | Defect it simulates | The hint when it survives |
|---|---|---|---|
| `arm` | Drops one clause of a `case`, `cond`, or multi-head function | A case stops being handled | *No test fails without this clause. Assert what only it returns, in a case that takes it.* |
| `compare` | Shifts a comparison across its boundary: `>=` to `>`, `<` to `<=` | An off-by-one in a gate | *No test tells this comparison apart from a shifted one. Add a case at the boundary where the two sides are equal.* |
| `connect` | Swaps `and` for `or`, and back | A gate that never or always fires | *No test has exactly one side of this condition true. Add a case for each side on its own.* |
| `negate` | Inverts a condition | An inverted guard | *No test tells the two branches of this condition apart. Assert what only one of them does.* |
| `literal` | Perturbs a literal: a number, a string, a boolean | A wrong seed or base case | *No test depends on this exact value.* |
| `call` | Elides a call, leaving its argument or nothing | A step that silently does nothing | *No test observes what this call does. Assert what it returns or what it changes.* |

Hints come from a fixed template per spell, filled from the site. No model generates them: they are deterministic, and honest about what kalku actually knows.

With `spells` in [`.kalku.toml`](../configuration/) you choose which ones are cast.

## Other spells the binary names

`kalku info spells` lists three more, outside the default set:

| Spell | What it does |
|---|---|
| `await` | Takes the deadline off a wait, or the waiting off a call |
| `supervise` | Changes what happens when a process dies: the restart, the link, the trapping |
| `foreign` | Whatever an existing framework's operator did; a driver's spell |

`await` and `supervise` are the concurrency spells. The [design document](https://github.com/lnds/kalku/blob/main/docs/design.md) explains their rules: a hang is not a kill, a flaky kill is not evidence, and they are asked for by name.

## In each language

Sites always come from the language's own parser, never from a scan of the text. And they are never proposed inside tests, comments or documentation.

### Elixir

| Spell | Forms |
|---|---|
| `arm` | Delete a clause of `case`, `cond`, `with … else`, `receive`, or a multi-clause function |
| `compare` | `>=`→`>`, `<`→`<=`, `==`→`!=`, in expressions and `when` guards |
| `connect` | `and`↔`or`, `&&`↔`\|\|` |
| `negate` | `if`↔`unless`, `c` → `not c` in conditions |
| `literal` | `0`→`1`, `n`→`n+1`, `true`↔`false`, `:ok`↔`:error`, `""` for a non-empty string |
| `call` | Drop a pipe stage (`\|> f()`), `f(x)` → `x` |

### Rust

| Spell | Forms |
|---|---|
| `arm` | Delete a `match` arm, only when a catch-all remains: without one, the compiler, not a test, is what rejects the wekufe |
| `compare` | `>=`↔`>`, `<`↔`<=`, `==`↔`!=`, in expressions and in match guards |
| `connect` | `&&`↔`\|\|`, except in a `let` chain |
| `negate` | `if c` → `if !(c)`, and drop a `!` |
| `literal` | `n`→`n+1` for plain decimals within their type's range, `true`↔`false`, a non-empty string → `""` |

`call` is not offered in Rust: dropping a call almost never keeps the types, so it would propose compile errors and little else.

### Python

| Spell | Forms |
|---|---|
| `arm` | Delete a `case` of a `match`, whole |
| `compare` | `>=`↔`>`, `<=`↔`<`, `==`↔`!=`, `is`↔`is not`, `in`↔`not in` |
| `connect` | `and`↔`or`, one operator at a time in a chain |
| `negate` | `not x` becomes `x`, and a condition `c` becomes `not (c)` (`if`, `elif`, `while`, a conditional expression) |
| `literal` | `n`→`n+1` for plain decimals, `True`↔`False`, a non-empty string → `""` |
| `call` | A call that is a whole statement, awaited or not, becomes `pass` |

### Java

| Spell | Forms |
|---|---|
| `arm` | Delete a `case` of a `switch`, statement or expression, only while a `default` remains |
| `compare` | `>=`↔`>`, `<=`↔`<`, `==`↔`!=` |
| `connect` | `&&`↔`\|\|` |
| `negate` | A `!` is dropped, and the condition `c` of an `if` becomes `!(c)` |
| `literal` | `n`→`n+1` for plain decimal `int` and `long` literals within their type's range, `true`↔`false`, a non-empty string or text block → `""` |
| `call` | A call that is a whole statement becomes the empty statement `;` |
