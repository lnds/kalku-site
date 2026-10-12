---
title: "kalku info"
description: "What kalku knows about spells, outcomes, formats and agents, documented from the binary itself."
---

Documents the spells, the outcomes, the formats and the agent loop from the binary itself. It is the source an agent consults instead of guessing.

```sh
kalku info [topic] [options]
```

Without a topic, it lists the ones there are:

```
topics:
  spells          The kinds of defect kalku casts, one per wekufe.
  outcomes        What a cast can come to. The score is killed / (killed + survived), and nothing else.
  formats         How a run reports what it found.
  agents          The loop kalku is built for, and the rules that keep it honest.
```

## Topics

| Topic | What it answers |
|---|---|
| `kalku info spells` | The kinds of defect kalku casts, one per wekufe. See [Spells](../spells/) |
| `kalku info outcomes` | What a cast can come to. See [Outcomes and score](../outcomes/) |
| `kalku info formats` | How a run reports what it found. See [What a run tells you](../report/) |
| `kalku info agents` | The loop kalku is built for, and the rules that keep it honest. See [For coding agents](../agents/) |

## Options

| Option | What it does |
|---|---|
| `--json` | Print the topic as JSON |
| `--snippet` | Print only the lines an agent pastes into `CLAUDE.md` |

```sh
kalku info spells --json
kalku info agents --snippet
```
