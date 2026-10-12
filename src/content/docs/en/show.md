---
title: "kalku show"
description: "One wekufe in full: site, diff, covering tests, hint and history."
---

Shows one wekufe in full: where it is, what changed, which tests cover it, the hint and its history.

```sh
kalku show <wekufe>
```

The report of a run summarises: in the `agent` format, for instance, `covering_tests` lists only the first five tests that cover the line. `kalku show` gives the full list.

To re-cast it after writing a test, use [`kalku cast`](../cast/).
