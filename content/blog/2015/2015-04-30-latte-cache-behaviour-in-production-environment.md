---
date: "2015-04-30"
draft: false
title: "Latte cache behaviour in production environment"
tags: ["latte", "cache"]
type: "blog"
slug: "latte-cache-behaviour-in-production-environment"
author: "Pavel Janda"
---

*This article was taken and translated from (paveljanda.com)[https://paveljanda.com].*

## Behaviour in dev mode

In development mode, Latte is checking `filemtime` of each template file in each request. This is the reason why you don't have to delete all files in the `/temp/cache` directory when modifying templates.

## Behaviour in production mode

In the production mode, it would slow the application down, hence the templates are once cached and when you make some changes to the template, the change is not applied to the result. But maybe you need to check the changes in production mode:

```yml
services:
    nette.latteFactory:
        setup:
            - setAutoRefresh(TRUE)
```

But **keep in mind** that from this time on, Latte will check each file in each request...
