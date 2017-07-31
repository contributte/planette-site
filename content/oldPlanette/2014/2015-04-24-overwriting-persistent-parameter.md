---
date: "2015-04-24"
draft: false
title: "Overwriting persistent parameter"
tags: ["snippet", "links"]
type: "blog"
slug: "overwriting-persistent-parameter"
author: "Honza Černý"
---

## Problem

Let's have persistent parameter in presenter with some default value. The value here is `NULL`.

```php
/** @persistent int */
public $page;
```

This parameter is now always transferred between redirects. But we want to disable that for some links. Here is how.

## Solution

Create link and pass that parameters' default value as an attribute.

```latte
<a href="{link someAction, page => NULL}">some text</a>
<!-- or -->
<a n:href="someAction, page => NULL">some text</a>
```
