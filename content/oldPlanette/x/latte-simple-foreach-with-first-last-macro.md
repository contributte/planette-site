---
date: ""
draft: false
title: "Latte simple foreach with {first} {last} macro"
tags: ["snippet", "latte"]
type: "blog"
slug: "latte-simple-foreach-with-first-last-macro"
author: "Honza Černý"
---

```latte
{foreach $form->errors as $error}
    {first}<ul>{/first}
    <li class="error">{$error}</li>
    {last}</ul>{/last}
{/foreach}
```
