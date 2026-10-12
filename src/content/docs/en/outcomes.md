---
title: "Outcomes and score"
description: "What a cast can come to, which outcomes go into the score and which are reported apart."
---

A cast can end in eight ways. Only two of them move the score.

```sh
kalku info outcomes
```

| Outcome | What it means | In the score |
|---|---|---|
| `killed` | A test noticed the defect | Counts |
| `survived` | Every test that reaches the line ran, and none noticed | Counts |
| `timeout` | The wekufe ran past its deadline; an endless loop is not a failing assertion | Reported apart |
| `no_coverage` | No test runs the code the wekufe is in, so nothing judged it | Reported apart |
| `compile_error` | The wekufe does not compile, so it says nothing about the suite | Reported apart |
| `crashed` | The cast produced no verdict: the kalku died, could not run its tests, or the wekufe took more memory than its ceiling | Reported apart |
| `nondeterministic` | Cast several times and did not agree with itself; a result nobody should trust | Reported apart |
| `equivalent` | The wekufe cannot be told apart from the original | Reported apart |

## The score

```
score = killed / (killed + survived)
```

And nothing else. Timeouts, crashes and missing coverage are shown next to the score, never folded into it: an infinite loop is not a failing assertion, and pretending it is inflates the number.

```
score 60% · 3 killed · 2 survived · 1 compile error
```

## What counts as a kill

- A test only counts as killing a wekufe if it **passes on the original code**. A test that fails on both is a broken test, not a kill.
- A timeout **never** counts as a kill.
- A site no test reaches is `no_coverage`, neither a survivor nor a kill.

## A survivor is a hole

A wekufe that survives is a hole in the suite, with a file, a line and a diff. The usual answer is to write the missing test. When the wekufe truly cannot be told apart from the original, it is declared as an [equivalent mutant](../equivalents/), with a written reason.
