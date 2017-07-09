---
date: ""
draft: false
title: "Connect Dibi as a service with tracy bar"
tags: ["snippet", "neon", "dependency injection", "dibi", "tracy"]
type: "blog"
slug: "connect-dibi-as-a-service-with-tracy-bar"
author: "Honza Černý"
---

`config.neon`

```neon
parameters:
    database:
        host: localhost
        username: root
        password: ***
        database: database_name
        lazy: TRUE
        profiler : TRUE

services:
    connection:
        class: DibiConnection(%database%)
```

or with extension

```neon
# This will create service named 'dibi.connection'.
# Requires Nette Framework 2.2

extensions:
    dibi: Dibi\Bridges\Nette\DibiExtension22

dibi:
    host: localhost
    username: root
    password: ***
    database: database_name
    lazy: TRUE
```
