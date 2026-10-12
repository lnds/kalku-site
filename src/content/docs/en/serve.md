---
title: "Keep it warm"
description: "kalku serve keeps the kalku a project was measured with, so the next run casts over a warm one."
---

A run spends most of its time setting the project up. `kalku serve` keeps the kalku a project was measured with, so the next run casts over a warm one:

```sh
kalku serve                    # a 0600 Unix socket, streaming a run as it happens
```

It answers the client protocol on a Unix socket with `0600` permissions, and streams a run as it happens.

## When the pool is thrown away

The pool is thrown away the moment any source or test file changes: measuring with a kalku that holds yesterday's code is measuring yesterday's code.

## One client at a time

`kalku serve` serves one client at a time.

## What "warm" means in each language

In Elixir, a warm kalku is a BEAM node with the project loaded once: a wekufe is loaded in memory instead of rebuilding. In languages that compile to native code, such as Rust and kaikai, a test binary cannot be hot-loaded; what stays warm there is the build directory in the reni. [Languages](../languages/) has the detail for each one.
