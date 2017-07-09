---
date: ""
draft: false
title: "Dibi fluent insert"
tags: ["snippet", "dibi"]
type: "blog"
slug: "dibi-fluent-insert"
author: "Honza Černý"
---

don't forget for execute

```php
$dibi->insert('table', $values)
    ->execute(\Dibi::IDENTIFIER);
```
