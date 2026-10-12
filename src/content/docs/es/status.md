---
title: "Qué funciona hoy"
description: "kalku está en pre-alpha: qué piezas están hechas y cuáles todavía no."
---

kalku está en **pre-alpha**. Todo lo que describe esta documentación funciona hoy, salvo lo que esta página marca como pendiente. La tabla viene del README del [repositorio](https://github.com/lnds/kalku), que es donde se actualiza primero.

## Todavía no

| Pieza | Estado |
|---|---|
| Workers en paralelo en un proyecto Elixir (una sola ruta de build, así que un solo worker) | todavía no |
| `--watch` y `--ci` | todavía no |
| `merge`: combinar reportes de shards | todavía no |
| macOS en Intel, Linux en arm64 (esperando un toolchain de kaikai para ellos) | todavía no |

## Comandos y núcleo

| Pieza | Estado |
|---|---|
| **`kalku init`**: detecta el lenguaje, escribe `.kalku.toml` y el script de invocación | hecho |
| **`kalku run <files>`**: mide esos archivos y reporta los sobrevivientes | hecho |
| **`kalku cast <wekufe>`**: vuelve a lanzar un wekufe, y `kalku show` para leerlo de vuelta | hecho |
| **`kalku propose-equivalent`**: un agente propone, una persona acepta | hecho |
| **`kalku info`**: spells, resultados, formatos y el ciclo del agente, en el binario | hecho |
| **`kalku mcp`**: las cuatro herramientas para agentes, por stdio | hecho |
| **`kalku serve`**: el protocolo de cliente en un socket Unix `0600`, transmitiendo una corrida mientras ocurre | hecho: un cliente a la vez |
| **Sesiones calientes**: el pool con el que se midió un proyecto sobrevive a la corrida, y se reemplaza cuando el proyecto cambia | hecho |
| **Protocolo**: en ambas direcciones, NDJSON canónico, fixtures para cada mensaje | hecho |
| **Core**: planificador, selección de tests, resultados, puntaje, barrera, equivalentes, `.kalku.toml`, sharding, líneas cambiadas | hecho |
| **Reportes**: humano, JSON, anotaciones de GitHub, y NDJSON `agent` con pistas por spell | hecho |
| **Orquestador**: pool de kalku, scheduler, escalamiento de timeout (abort → reset → kill), presupuesto de reinicios, cancelación | hecho |
| **`--since <ref>`**: mide lo que tocó un cambio, y bloquea por los hoyos que introdujo | hecho |
| **`[score] ratchet`**: el puntaje del proyecto completo no puede bajar de la línea base guardada con `--store-baseline` | hecho |
| **`--all` y `--shard i/n`**: el proyecto completo, por partes, para una corrida nocturna | hecho: un shard dice que lo es y no se le exige el umbral |

## Los kalku de cada lenguaje

| Pieza | Estado |
|---|---|
| **kalku de Elixir**: sites, `prepare`, `baseline` con cobertura por test, `cast`, `abort`, `reset`, `reload` | hecho: todos los mensajes del protocolo salvo `delegate` |
| **kalku de kaikai**: el kalku con el que kalku se mide a sí mismo | hecho |
| **kalku de Rust**: sites para `arm`, `compare`, `connect`, `negate`, `literal` desde `syn`, detrás del protocolo de kalku | hecho: encuentra sites |
| kalku de Rust: `prepare`, `baseline` y `cast` en el reni, `abort`, cobertura por test con LLVM | hecho |
| kalku de Rust: `kalku init` para proyectos Cargo, incluido en el release | hecho |
| **kalku de Python**: sites desde `ast`, `prepare`/`baseline`/`cast` en hijos creados con fork, `abort`, cobertura por test con `sys.monitoring`, `kalku init`, incluido en el release | hecho |
| **kalku de Java**: sites para `arm`, `compare`, `connect`, `negate`, `literal`, `call` desde `javac`, detrás del protocolo de kalku, en Java 11, 17, 21 y 25 | hecho: encuentra sites |
| kalku de Java: `prepare`, `baseline` y `cast` en el reni para un proyecto Maven | hecho |
| kalku de Java: `kalku init` para proyectos Maven y Gradle, incluido en el release | hecho |
| kalku de Java: `abort`, terminando la JVM donde corren los tests | hecho |
| kalku de Java: cobertura por test, contada por JaCoCo y retenida donde no se pueda confiar en ella | hecho |
| kalku de Java: proyectos Maven de varios módulos; un site se juzga con los tests de cada módulo que usa el suyo | hecho |
| kalku de Java: builds Gradle, consultados al ejecutarlos con un script agregado desde fuera del proyecto | hecho |
| kalku de Java: proyectos que prueban con JUnit 4 o con TestNG, a través de sus motores para JUnit Platform | hecho |
| **Cobertura por test usada por una corrida**: un wekufe se lanza contra los tests que lo alcanzan | hecho: Elixir, Rust, Python, Java |

## Distribución

| Pieza | Estado |
|---|---|
| **`kalku_elixir` en Hex**: el kalku de Elixir se instala como cualquier dependencia | hecho |
| **Binarios de release**: `brew install`, o un tarball por plataforma, construidos y con checksum por CI | hecho |

## kalku medido por kalku

kalku usa kalku para probar su propio código: lanza wekufe en sus propias fuentes a través del kalku de kaikai y reporta lo que su suite no notó. Este es un reporte de esa corrida:

```
kalku/core/shard.kai:30  literal  shard.wrap32/1
  - 4294967296
  + 0
  covered by 189 tests
  No test depends on the exact value `4294967296` in `shard.wrap32/1`.

score 40% · 2 killed · 3 survived · 1 compile error
```
