---
date: "2015-04-30"
draft: false
title: "Different parts of nette have different caching configurations"
tags: ["latte", "cache", "dic", "configurator"]
type: "blog"
slug: "different-parts-of-nette-have-different-caching-configurations"
author: "Pavel Janda"
---

*This article was taken and translated from (paveljanda.com)[https://paveljanda.com].*

Nette Framework enables to disable cache to many different parts of the framework. The disbled cache is sometimes represented by `Nette\Caching\Storages\DevNullStorage`, sometimes by disabling temporary directory. I will describe in following articles what can be disabled and where you don't have any other choice but to use the cache.

## Latte

Let's tell Latte not to cache things:

```yml
services:
    nette.latteFactory:
        setup:
            - setTempDirectory(NULL)
```

We may also add some custom macros:

```yml
latte:
    macros:
        - App\Utils\Macros
```

This works, our macro is doing what it is supposed to do. But! When we change the namescpace (e.g. we move the macro to our super cool vendor `Super\Cool\Macros`), Tracy will show us warning that `Class App\Utils\Macros not found`. Hm. :(

The thing is, we can affect only caching mechanism of `{cache}` macros, not the Latte engigne itself.

## DIC

`DIC` uses it's own caching mechanism.End of story.

## Nette\Database\Table

`NDBT` requires from `DIC` `Nette\Caching\Istorage`, which is a good thing. We may simply put in `DIC` that `DevNullStorage` mentioned above:

```yml
services:
    cacheStorage:
        class: Nette\Caching\Storages\DevNullStorage
```

Great - solved.

## RobotLoader

`RobotLoader` creates it's own cache just before parsing `config` files - which makes sense - so it doesn't give a damn about what you want to tell him using `neon` configs. But listen, we can change this behaviour for example in `bootstrap.php`: 

```php
<?php

Nette\Loaders\RobotLoader::setCacheStorage(new Nette\Caching\Storages\DevNullStorage).

# ...
```

## Application cache

In your application, classes usually requires in class constructor `Nette\Caching\Istorage` instance, which is taken from `DIC`. As mentioned under `Nette\Database\Table`: if you register `DevNullStorage`, your applciation and your business logic will use it.
