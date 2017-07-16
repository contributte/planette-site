---
date: "2017-07-17"
draft: false
title: "Dependency injection decorator"
tags: ["dic", "config"]
type: "blog"
slug: "dependency-injection-decorator"
author: "Pavel Janda"
---

In `nette/di` vendor, there is an extension called `Nette\DI\Extensions\DecoratorExtension` which is registered into `DIC` by default.
What it does?

Let's say you have many classes of one type:

```php
interface IDataProvider
{
    public function setLocale(string $locale): void;

    public function getData(): array;
}


abstract class AbsctractDataProvider
{
    protected $locale;

    public function setLocale(string $locale): void
    {
        $this->locale = $locale;
    }
}


final class UserDataProvider extends AbsctractDataProvider implements IDataProvider
{
    public function getData(): array
    {
        return [];
    }
}


final class ProductDataProvider extends AbsctractDataProvider implements IDataProvider
{
    public function getData(): array
    {
        return [];
    }
}


final class CategoryDataProvider extends AbsctractDataProvider implements IDataProvider
{
    public function getData(): array
    {
        return [];
    }
}
```

Now that you have all data providers registered in config.neon:

```yml
services:
    - App\Presenters\UserDataProvider
    - App\Presenters\ProductDataProvider
    - App\Presenters\CategoryDataProvider
```

you would normally have to set `$locale` parameter for yeach service separately. Or you can use a decorator:

```yml
decorator:
    App\Presenters\IDataProvider:
        setup:
            - setLocale('cs')
```

All registered services implementing IDataProvider will now have a $locale parameter set. :)
