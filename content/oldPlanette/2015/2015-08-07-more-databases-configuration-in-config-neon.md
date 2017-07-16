---
date: "2015-08-07"
draft: false
title: "More databases configuration in config.neon"
tags: ["config", "database"]
type: "blog"
slug: "more-databases-configuration-in-config-neon"
author: "Jiří Zralý"
---

If you need to connect to different database in different repositories. Follows Nette Sandbox configuration.

config.neon
```yaml

database:
	db1:
		dsn: 'mysql:host=localhost;dbname=db1'
		user: root
		password: password
	db2:
		dsn: 'mysql:host=localhost;dbname=db2'
		user: root
		password: passsword


services:
	- App\Model\Repositories\UserRepository(@database.db1.context)
	- App\Model\Repositories\PotatoRepository(@database.db2.context)
```
