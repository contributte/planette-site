---
date: "2014-10-28"
draft: false
title: "Delete directory recursively"
tags: ["snippet", "finder"]
type: "blog"
slug: "delete-directory-recursively"
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
