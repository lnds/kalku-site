---
title: "Installation"
description: "Install kalku with Homebrew, from a release or from source."
---

```sh
brew install lnds/kalku/kalku
```

It runs on macOS on Apple Silicon and on Linux on x86_64 with GLIBC 2.38 or newer: the platforms [kaikai](https://kaikai-lang.org/), the language kalku is written in, publishes a toolchain for. Its floor is kalku's floor. macOS on Intel and Linux on arm64 are not there yet.

Check that it answers:

```sh
kalku info
```

## From a release

The same tarballs are on every [release](https://github.com/lnds/kalku/releases). Unpack the one for your platform and put `kalku`, `kalku-kaikai`, `kalku-rust`, `kalku-python` and `kalku-java` on your `PATH`.

## From source

With kaikai installed, in the version `.kaikai-version` names:

```sh
git clone https://github.com/lnds/kalku
cd kalku
make install                  # PREFIX=/usr/local by default
kalku info                    # check it answers
```

## The Elixir kalku

The Elixir kalku runs inside the project it measures, so besides the binary it exists as a package: [`kalku_elixir` on Hex](https://hex.pm/packages/kalku_elixir). You do not have to install it by hand to try things out: a run over a project that does not depend on it fetches it into the reni, in its own version, and builds it there with the project's Elixir. [Measure a project](../first-run/) explains it.

## Status

kalku is **pre-alpha**. [What works today](../status/) lists what is done and what is not.
