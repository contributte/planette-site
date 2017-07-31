---
date: "2014-10-28"
draft: false
title: "Service registration in NEON"
tags: ["neon", "configuration", "service"]
type: "blog"
slug: "service-registration-in-neon"
author: "Honza Černý"
---

Passing named service:

```neon
services:
    testdb: PDO('mysql:host=localhost;dbname=test', 'test','')   # named services
    - Article(@testdb)   # testdb is defined as service with name
```

Verbose style of service registration with assignment to **public** property `$db`:

```neon
services:
    -
        factory: App\Presenter\HomepagePresenter
        setup:
            - $db( stdClass() )

    -
        factory: App\Presenter\HomepagePresenter
        setup:
            - $db(@testdb)   # used named service
```

Verbose style of factory registration:

```neon
services:
    -
        implement: ArticleFactory
        # factory: Article   # is defined in @return anotation or as a return type
        # parameters: [a, b]
```

You can skip defining parameters, which can be acquired by DI compiler via autowire mechanism:

```neon
services:
    - ArticleManager(..., ..., 123)   # first and second parameter will be autofilled, third is defined by us
```

You can also call native PHP functions:

```neon
services:
    - AssetsCache( ::time() )   # return a value from time() function
```

When you want to register service factory, but that factory should not be static:

```neon
services:
    - MyServiceFactory
    - @MyServiceFactory::create
```

Turning of the autowiring:

```neon
services:
    pdo: PDO('mysql:host=localhost;dbname=test', 'test','')
    - App\Model\UserManager
    - PdoFactory::create('mysql:host=localhost;dbname=test')
    testdb:
        factory: PDO('mysql:host=127.0.0.1', 'root', 'xxx')
        setup:
            - setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)
        autowired: no   # <----  THIS WAY
```
