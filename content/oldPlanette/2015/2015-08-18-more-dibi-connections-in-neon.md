---
date: "2014-08-18"
draft: false
title: "More Dibi connections in Neon"
tags: ["config", "database", "dibi"]
type: "blog"
slug: "more-dibi-connections-in-neon"
author: "Miroslav Hůla"
---

```yaml
parameters:
	databases:
		one:
			username:  # set in config.local.neon
			password:  # set in config.local.neon

		two:
			username:  # set in config.local.neon
			password:  # set in config.local.neon

extensions:
	dibi.one: Dibi\Bridges\Nette\DibiExtension22
	dibi.two: Dibi\Bridges\Nette\DibiExtension22

dibi.one:
    driver: postgre
    port: 5433
    database: xxxxx
    username: %databases.one.username%
    password: %databases.one.password%

dibi.two:
    autowired: no  # note this parameter
    driver: oracle
    database: "(DESCRIPTION = (...))"
    username: %databases.two.username%
    password: %databases.two.password%
    charset: UTF8

services:
	- App\Model\DataOne  # does not need specify connection, the 'one' is autowired
	- App\Model\DataTwo(@dibi.two.connection)
```
