---
date: "2015-07-01"
draft: false
title: "Use curly `{}` braces in templates"
tags: ["latte", "escape", "template"]
type: "blog"
slug: "use-curly-braces-in-templates"
author: "Armin Schmidtke"
---

Curly braces `{}` are the default delimiters in Latte. If you don't want the curly braces interpreted as Latte tags (for example, in JavaScript), you need to type a space after `{`:

```html
<div>
    { Hello }
</div>
```

Or you can use the Latte macros `{l}` and `{r}`:

```html
<div>
    {l} Hello {r}
</div>
```

Or you can turn off the latte syntax for particular block:

```html
<div n:syntax="off">
    {Hello}
</div>
```
