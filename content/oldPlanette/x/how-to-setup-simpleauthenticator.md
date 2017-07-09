---
date: ""
draft: false
title: "How to setup SimpleAuthenticator"
tags: ["snippet", "neon", "dependency injection"]
type: "blog"
slug: "how-to-setup-simple-authenticator"
author: "Honza Černý"
---

With DI extension in `config.neon`

```neon
nette:
    security:
        users:
            john: p4ss
            admin: P4S5w0rD@!
```

is the same as long version without using DI extension in `config.neon`

```neon
services:
    - Nette\Security\SimpleAuthenticator({john:p4ss, admin: 'P4S5w0rD@!'})
```
