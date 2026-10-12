---
title: "Instalación"
description: "Instala kalku con Homebrew, desde un release o desde el código fuente."
---

```sh
brew install lnds/kalku/kalku
```

Funciona en macOS con Apple Silicon y en Linux x86_64 con GLIBC 2.38 o más nuevo: las plataformas para las que [kaikai](https://kaikai-lang.org/), el lenguaje en que está escrito kalku, publica un toolchain. Su piso es el piso de kalku. macOS en Intel y Linux en arm64 todavía no están.

Comprueba que responde:

```sh
kalku info
```

## Desde un release

Los mismos tarballs están en cada [release](https://github.com/lnds/kalku/releases). Descomprime el de tu plataforma y deja `kalku`, `kalku-kaikai`, `kalku-rust`, `kalku-python` y `kalku-java` en tu `PATH`.

## Desde el código fuente

Con kaikai instalado, en la versión que indica `.kaikai-version`:

```sh
git clone https://github.com/lnds/kalku
cd kalku
make install                  # PREFIX=/usr/local by default
kalku info                    # check it answers
```

## El kalku de Elixir

El kalku de Elixir corre dentro del proyecto que mide, así que además del binario existe como paquete: [`kalku_elixir` en Hex](https://hex.pm/packages/kalku_elixir). No tienes que instalarlo a mano para probar: una corrida sobre un proyecto que no depende de él lo descarga al reni, en su misma versión, y lo compila ahí con el Elixir del proyecto. [Medir un proyecto](../first-run/) lo explica.

## Estado

kalku está en **pre-alpha**. [Qué funciona hoy](../status/) lista lo que está hecho y lo que no.
