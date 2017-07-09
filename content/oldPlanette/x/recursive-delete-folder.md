---
date: ""
draft: false
title: "Recursive delete folder"
tags: ["snippet", "finder"]
type: "blog"
slug: "recursive-delete-folder"
author: "Honza Černý"
---

```php
$dirContent = Nette\Utils\Finder::find('*')->from($directory)->childFirst();
foreach ($dirContent as $file) {
  if ($file->isDir())
    @rmdir($file->getPathname());
  else
    @unlink($file->getPathname());
}

@unlink($directory);
```
