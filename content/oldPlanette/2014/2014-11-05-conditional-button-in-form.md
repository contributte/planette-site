---
date: "2014-11-05"
draft: false
title: "Conditional button in form"
tags: ["snippet", "form", "latte"]
type: "blog"
slug: "conditional-button-in-form"
author: "Honza Černý"
---

Form definition

```php
if (!empty($this->article)) {
    $form->addSubmit('send', 'Edit article');
    $form->addSubmit('sendAndView', 'Edit article and view');
} else {
    $form->addSubmit('send', 'Add article');
}
```

Form processing

```php

if ($form['send']->isSubmittedBy()) {
    // ...
}
if (isset($form['sendAndView']) && $form['sendAndView']->isSubmittedBy()) {
    // ...
}
```

Form rendering

```latte
{ifset $form[sendAndView]}
    {input sendAndView class => "btn btn-secondary"}
{/ifset}
```
