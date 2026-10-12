---
title: "El elenco"
description: "Qué significan kalku, wekufe, kalkutun y reni, de dónde vienen y qué nombra cada palabra en la herramienta."
---

En la creencia mapuche, un *kalku* es un brujo que trabaja en una cueva escondida, el *reni*, y manda a los *wekufe*, espíritus que hacen daño. kalku toma prestado ese elenco:

| Término | Significado |
|---|---|
| **kalku** | Un worker ligado a un lenguaje, que sabe romper código en ese lenguaje |
| **wekufe** | Un mutante: tu programa con exactamente un defecto lanzado en él |
| **kalkutun** / **spell** | Un tipo de defecto: borrar una cláusula de un `case`, correr `>=` a `>`, cambiar `and` por `or`, … *Kalkutun* es el daño que obra un kalku; el código y el protocolo dicen `spell` |
| **reni** | Un espacio de trabajo aislado donde se lanzan los wekufe. Tu árbol de trabajo nunca se toca |

El plural de wekufe no cambia: se dice *los wekufe*.

## Otras palabras que vas a leer

| Término | Significado |
|---|---|
| **site** | Un lugar del código donde aplica un spell: archivo, posición, spell y texto de reemplazo |
| **cast** | Lanzar un wekufe: aplicar el defecto y correr los tests que lo cubren |
| **summon** | Iniciar un kalku. Por eso el script del proyecto se llama `.kalku/summon` |
| **sobreviviente** | Un wekufe que ningún test detectó: un hoyo en la suite, con un archivo, una línea y un diff |

## Palabras simples en los reportes

Los reportes usan palabras simples (`killed`, `survived`, `timeout`) para que un log de CI se lea sin el glosario. [Resultados y puntaje](../outcomes/) las explica todas.

## Kalku, la mascota

La mascota también se llama Kalku: un cóndor brujo, negro, con cintillo y bufanda rojos y una sonrisa llena de dientes. Es bueno, pero se da aires de siniestro.

Kalku es hermano de Madu, la pudú machi que es mascota de [Kimün](https://kimun.tools), una herramienta que mide la salud del código desde la terminal. Madu mide el código; Kalku lo rompe para saber si los tests lo notan.
