---
title: "MCP server"
description: "kalku mcp serves the four agent tools over stdio: how to install it in your host and what each one does."
---

`kalku mcp` serves the four agent tools over stdio, so a coding agent can measure, re-cast and read a wekufe without shelling out. It takes no arguments and reads no configuration of its own: the project is whichever one the host is working in, or the `root` a tool call names.

## Install it

Claude Code:

```sh
claude mcp add kalku -- kalku mcp
```

Cursor, Windsurf, Zed, Claude Desktop and anything else that reads an `mcpServers` block:

```json
{
  "mcpServers": {
    "kalku": {
      "command": "kalku",
      "args": ["mcp"]
    }
  }
}
```

`kalku` has to be on the `PATH` the host starts with, which is not always the one your shell has: a GUI app on macOS does not read your profile. If the host cannot find it, give the absolute path from `which kalku`.

## The tools

| Tool | What it does |
|---|---|
| `kalku_run` | Runs and returns the survivors in the agent format |
| `kalku_cast` | Re-casts wekufe and returns their outcomes |
| `kalku_show` | Full detail of one wekufe |
| `kalku_propose_equivalent` | Writes a **proposal** for a person to review; it is never applied by itself |

There is deliberately no tool that suppresses, excludes or ignores anything. See the guardrails in [For coding agents](../agents/).

## Narrow kalku_run

`kalku_run` runs the project's suite many times over and takes minutes, so point it at a file or two rather than at everything. It takes the same narrowing as the command line:

- `since`, a git ref, measures only the lines changed since it, and needs no file named.
- `limit` caps how many wekufe are cast: 100 unless told otherwise, and all of them under `since`.

## Progress and cancellation

A host that asks to hear of a call, by giving it a `progressToken`, is told how the run is going as it goes: each stage, and how many wekufe are cast. A run is silent for minutes otherwise, and a host counts that as dead.

A host that calls a run off (`notifications/cancelled`) ends it and goes on being served. One that closes the pipe while a run is going ends the run too, and the server with it, and so does SIGTERM. In each case the kalku are banished.

A script that drives `kalku mcp` keeps its end open until it has read the answer.
