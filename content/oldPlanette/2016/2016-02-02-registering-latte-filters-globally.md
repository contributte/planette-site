---
date: "2016-02-02"
draft: false
title: "Registering latte filters globally"
tags: ["latte", "config"]
type: "blog"
slug: "registering-latte-filters-globally"
author: "Ali"
---

In this article, I would like to expand the [idea](https://play.nette.org/post/123-globalni-registrace-filteru) of David Matejka.

Only thing you have to do is simly register a latte fitler class in config.neon file and then adding just one method to this class each time you want to add different filter:

```yml
services:
    latte.latteFactory:
        setup:
            - addFilter(null, [App\Filters, loader])
```

```php
namespace App;

class Filters
{
	/**
	 * @return mixed
	 */
	public static function loader(string $filter)
	{
		return (method_exists(__CLASS__, $filter) ? call_user_func_array([__CLASS__, $filter], array_slice(func_get_args(), 1)) : null);
	}


	public static function myFilter(string $s): string
	{
		return "{$s}ek";
	}
}
```

Usage:

```
{var $foo = "Aleš"}

{$foo|myFilter}
```

Name of the filter has to be the same as the name of the method.

**Beware!** If your filter will return `null`, Tracy will show an error that the filter does not exist. You would better return an empty string `''`.

This tutorial could be used since nette v2.3.
