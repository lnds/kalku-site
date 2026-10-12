---
title: "kalku cast"
description: "Re-casts a wekufe after a test was written, to learn whether it is dead now."
---

Re-casts the wekufe you name, and only those. It is the step of the loop that answers *"does the test I just wrote kill it?"*.

```sh
kalku cast <wekufe>
```

## The name of a wekufe

A wekufe is named by the text it was cast in, so editing its file renames it. Re-casting an old name says so, and a new `kalku run` gives the new ones.

In the `agent` format, the name is in the `wekufe` field of each survivor.

## Only a test that passes on the original counts

A test only counts as killing a wekufe if it passes on the original code. A test that fails on both is a broken test, not a kill: a wekufe cannot be killed with a broken test.

## Against a warm kalku

With [`kalku serve`](../serve/) running, `cast` casts against a warm kalku and does not set the project up again.
