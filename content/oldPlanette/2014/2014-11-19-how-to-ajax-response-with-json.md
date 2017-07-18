---
date: "2014-11-19"
draft: false
title: "How to AJAX response (with JSON)"
tags: ["snippet", "json", "response"]
type: "blog"
slug: "how-to-ajax-response-with-json"
author: "Honza Černý"
---

```php
$this->sendJson($dataObject);
```

or

```php
$this->sendResponse(new JsonResponse($myObject));
```

or use native nette channel

```php
$this->payload->data = $data;
$this->sendPayload();
```

or just redraw component

```php
if ($this->isAjax()){
     $this->redrawControl('datalist');
}
```
