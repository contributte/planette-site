---
date: "2014-10-28"
draft: false
title: "How to create lazy factory"
tags: ["snippet", "dependency injection"]
type: "blog"
slug: "how-to-create-lazy-factory"
author: "Honza Černý"
---

Register it in `config.neon`

```neon
- SeoFactory
```

Create interface with one public method `create` with annotation (or return type) for our class.

```php
interface SeoFactory
{
    /** @return SEO */
    public function create();
}

class SEO
{
    // ...
}
```

The DI container will now create its instance when needed.
