---
title: "Languages"
description: "The languages kalku measures today and how the kalku of each one works."
---

kalku measures projects in Elixir, Rust, Python, Java and kaikai. Each language has its own **kalku**: a worker that knows how to break code in that language and nothing else.

| Language | kalku | How |
|---|---|---|
| Elixir | native | kalku owns the loop: warm BEAM nodes, in-memory loading, coverage-based test selection |
| kaikai | native (thin) | Built on `kai mutate`; this is how kalku tests itself |
| Rust | native | Sites come from `syn`, Rust's own parser; the **2024 edition only** (Rust 1.85 or later). It finds sites and casts them, answers `abort` in place, and selects tests by coverage where the LLVM tools are |
| Python | native | Sites come from `ast` and `tokenize`, Python's own parser; it runs in the **project's own interpreter** (3.12 or later) with the standard library only. Every run of the suite is a forked child, so `abort` is a kill and a wekufe never leaks; coverage per test comes from `sys.monitoring`; the project's own pytest options are kept |
| Java | native | Sites come from `javac`, the project's own compiler, through its public tree API; it runs on the **project's own JDK** (11 or later) with no dependencies. It builds the project with Maven in the reni, compiles each wekufe in memory, and runs the tests in a JVM of their own: JUnit 5 or later, JUnit 4, or TestNG. Maven or Gradle, one module or several |
| others | driver | Wraps an existing framework (Stryker, …), normalizes its results, and recomputes the score. Not implemented yet |

## What they share

- **Sites come from the language's own parser**, never from regexes or a scan of the text.
- **They run with the project's own tools:** its Elixir, its Python interpreter, its JDK. kalku never chooses which version of anything the project gets.
- **Per-test coverage** decides which tests a wekufe is cast against, in Elixir, Rust, Python and Java.

## Notes by language

- **Elixir.** The kalku runs inside the project it measures. For now it uses a single worker per project, because there is one build path.
- **Rust.** Per-test coverage needs the LLVM tools (the rustup component `llvm-tools`). Without them, every cast runs the whole suite. A package on an edition older than 2024 is skipped, with that reason.
- **Python.** It needs Python 3.12 or later, for `sys.monitoring`. It uses the active environment, then `.venv` or `venv`, then `python3`.
- **Java.** Java 8 is not supported. A JUnit 4 older than 4.12 is refused by its version.
- **kaikai.** It reports no per-test coverage and has no warm runtime to reload into, so each wekufe rebuilds the package and runs the whole suite.

Which spells each language offers, and in which forms, is in [Spells](../spells/).
