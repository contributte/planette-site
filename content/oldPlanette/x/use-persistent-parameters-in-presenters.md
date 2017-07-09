---
date: ""
draft: false
title: "Use persistent parameters in Presenters"
tags: ["snippet", "presenter", "persistent"]
type: "blog"
slug: "use-persistent-parameters-in-presenters"
author: "Honza Černý"
---

```php
class ProductPresenter extends Presenter
{
    /** @persistent */
    public $lang;

    // ...
```
