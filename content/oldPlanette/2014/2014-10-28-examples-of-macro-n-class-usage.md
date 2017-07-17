---
date: "2014-10-28"
draft: false
title: "Examples of macro \"n:class\" usage"
tags: ["snippet", "latte", "n:macro"]
type: "blog"
slug: "examples-of-macro-n-class-usage"
author: "Honza Černý"
---

use `,` as a class separator

```latte
<header n:class="position-default, homepage, $query ? position-top">
    <h1>Nette Code Snippets</h1>
</header>

{* is same as: *}

<header class="position-default homepage{if $query!=''} position-top{/if}">
    <h1>Nette Code Snippets</h1>
</header>
```
