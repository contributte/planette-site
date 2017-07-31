---
date: "2015-04-24"
draft: false
title: "Different layout in administration"
tags: ["article", "administration", "admin"]
type: "blog"
slug: "different-layout-in-administration"
author: "Tomáš Votruba"
---

## One-presenter administration, `AdminPresenter.php`

Handful for simple and small administration.

### Directory structure

```
<b>app/
    models/
    presenters/
        AdminPresenter.php
        BasePresenter.php
        HomepagePresenter.php
    templates/
        Admin/
            default.latte
        Homepage/
            default.latte
        @layout.latte</b>   ← basic layout
            <b>@layoutAdmin.latte</b>   ← admin layout
    <b>bootstrap.php</b>
```

1. `templates/Admin/default.latte`

    ```latte
    <!-- use adminLayout.latte -->
    {layout "../@layoutAdmin.latte"}
    ```

2. or we can modify structure like this:

    ```latte
    <b>templates/
        Admin/
            default.latte
            @layout.latte
        Homepage/</b>
            ...
        <b>@layout.latte</b>
    ```

    and template `Admin/@layout.latte` will load for `AdminPresenter.php` automatically. See [automatic layout loader][doc-presenters-templates]

3. or `AdminBasePresenter`

    We still have `@layoutAdmin.latte` as in variant **1**

    ```php
    abstract class AdminBasePresenter extends BasePresenter
    {
        protected function beforeRender()
        {
            parent::beforeRender();
            $this->setLayout('layoutAdmin');
        }
    }
    ```

## Modules – Front & Admin

Divide application to two separated modules with their own `@layout.latte`.

See [MVC Applications & Presenters][doc-presenters-modules]


[doc-presenters-templates]: https://doc.nette.org/en/presenters#toc-templates
[doc-presenters-modules]: https://doc.nette.org/en/presenters#toc-modules
