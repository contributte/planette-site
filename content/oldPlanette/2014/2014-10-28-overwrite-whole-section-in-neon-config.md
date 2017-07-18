---
date: "2014-10-28"
draft: false
title: "Overwrite whole section in neon config"
tags: ["snippet", "neon"]
type: "blog"
slug: "overwrite-whole-section-in-neon-config"
author: "Honza Černý"
---

If you use exclamation mark after section name in `config.local.neon`, it will override the whole structure it may have inherited from `config.neon`.

```neon
# config.local.neon
nette:
    session!:   # <-- there is the exclamation mark
        autoStart: yes
```

```neon
# config.neon
nette:
    session:
        expiration: 14 days  # this will not be in the result
```
