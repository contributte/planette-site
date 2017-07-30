---
date: "2014-10-28"
draft: false
title: "Static function as a factory"
tags: ["snippet", "config", "dependency injection", "factory", "neon"]
type: "blog"
slug: "static-function-as-a-factory"
author: "Honza Černý"
---

Did you know, you could register a `public static` function as a factory in Nette configuration? Well, you do now. ;)

Just write your factory method:

```php
class PdoFactory
{
	public static function create(string $dsn) : \PDO
	{
		$name = 'xxx';
		$password = 'asd';

		return new \PDO($dsn, $name, $password);
	}
}
```

And register it in your `config.neon`:

```neon
services:
	- PdoFactory::create('mysql:host=localhost;dbname=test')
```
