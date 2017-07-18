---
date: "2015-02-01"
draft: false
title: "How to use Texy in Latte template as a filter"
tags: ["snippet", "texy", "dependency injection", "latte"]
type: "blog"
slug: "how-to-use-texy-in-latte-template-as-a-filter"
author: "Honza Černý"
---

Install Texy via composer and register it as a service in `config.neon`.

```neon
services
    - Texy
```

Register Texy as a Latte filter in presenter

```php
/**
 * @var \Texy @inject
 */
public $texy;

protected function createTemplate($class = NULL) {
    $template = parent::createTemplate($class);
    // $template->addFilter('texy', callback($this->texy, 'process')); // old php
    $template->addFilter('texy', array($this->texy, 'process'));

    return $template;
}
```

and use it in Latte file

```latte
{$article->content|noescape|texy}
```
