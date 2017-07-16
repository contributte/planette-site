---
date: "2014-10-28"
draft: false
title: "How to test exception call"
tags: ["snippet", "tester", "exception"]
type: "blog"
slug: "how-to-test-exception-call"
author: "Honza Černý"
---

```php
Assert::exception(function () {
    $this->userManager->addUser('user','P455w0rd');
}, 'DuplicateEntryException');

--/
```
