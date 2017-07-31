---
date: "2015-04-24"
draft: false
title: "Linking between modules"
tags: ["snippet", "routing", "module"]
type: "blog"
slug: "linking-between-modules"
author: "Honza Černý"
---

Linking between modules needs to be done using absolute routes. That means with colon at the beginning of the route. 

## Relative link to a module

```latte
<a href="{link Foo:Default:default}">link</a>
<!-- or -->
<a n:href="Foo:Default:default">link</a>
```

This will try to search for that route in current module.

## Absolute link to a module

```latte
<a href="{link :Foo:Default:default}">link</a>
<!-- or -->
<a n:href=":Foo:Default:default">link</a>
```

This will search for the `Foo` module in root.
