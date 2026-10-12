---
title: "The cast"
description: "What kalku, wekufe, kalkutun and reni mean, where they come from and what each word names in the tool."
---

In Mapuche belief, a *kalku* is a sorcerer who works in a hidden cave, the *reni*, and commands the *wekufe*, spirits that bring harm. kalku borrows that cast:

| Term | Meaning |
|---|---|
| **kalku** | A worker bound to one language, which knows how to break code in that language |
| **wekufe** | A mutant: your program with exactly one defect cast into it |
| **kalkutun** / **spell** | A kind of defect: drop a `case` clause, shift `>=` to `>`, swap `and` for `or`, … *Kalkutun* is the harm a kalku works; code and protocol say `spell` |
| **reni** | An isolated workspace where wekufe are cast. Your working tree is never touched |

The plural of wekufe is the same word: *the wekufe*.

## Other words you will read

| Term | Meaning |
|---|---|
| **site** | A place in the source where a spell applies: file, position, spell and replacement text |
| **cast** | To cast a wekufe: apply the defect and run the tests that cover it |
| **summon** | Start a kalku. That is why the project's script is called `.kalku/summon` |
| **survivor** | A wekufe no test caught: a hole in the suite, with a file, a line and a diff |

## Plain words in the reports

Reports use plain words (`killed`, `survived`, `timeout`) so a CI log reads without the glossary. [Outcomes and score](../outcomes/) explains all of them.

## Kalku, the mascot

The mascot is called Kalku too: a sorcerer condor, black, with a red headband and scarf and a grin full of teeth. He is good, but he likes to look sinister.

Kalku is the brother of Madu, the pudú machi who is the mascot of [Kimün](https://kimun.tools), a tool that measures the health of code from the terminal. Madu measures the code; Kalku breaks it to learn whether the tests notice.
