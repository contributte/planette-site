---
date: "2014-11-08"
draft: false
title: "Error presenter from module"
tags: ["snippet", "router", "module"]
type: "blog"
slug: "error-presenter-from-module"
author: "Honza Černý"
---

Here is how you change the default error presenter to one you have in module `Front`. The key is using a colon, just as you would when defining routes.

```neon
nette:
    application:
        errorPresenter: "Front:Error"
```
