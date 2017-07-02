---
date: "2014-04-24"
draft: false
title: "Single page microframework"
tags: ["microframework", "single page"]
type: "blog"
slug: "single-page-microframework"
author: "Honza Černý"
---

```php
<?php

if (empty($template)) {
    require __DIR__ . '/Nette/loader.php';

    $configurator = new Nette\Config\Configurator;
    $configurator->enableDebugger(__DIR__ . '/log'); // Enable Nette Debugger for error visualisation & logging
    $configurator->setTempDirectory(__DIR__ . '/temp');
    $container = $configurator->createContainer(); // Create Dependency Injection container from config.neon file

    $template = $container->nette->createTemplate()->setFile(__FILE__);
    $template->db = new Nette\Database\Connection('sqlite:data/ps.sdb');
    $template->render();
    exit;
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>

<body>
    <div n:foreach="$db->table(events)->order(date) as $event">
        <h4>{$event->name}</h4>
        <p>{$event->date|date:"j. n. Y"}</p>
    </div>
    ...

</body>
</html>
```
