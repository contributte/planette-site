---
date: "2015-07-13"
draft: false
title: "How to change cache journal from SQLiteJournal to FileJournal"
tags: ["snippet", "caching"]
type: "blog"
slug: "how-to-change-cache-journal-from-sq-lite-journal-to-file-journal"
author: "David Matějka"
---

The `nette/caching` package uses `SQLiteJournal` as a default journal since its 2.4 version.

Just to remind, the journal is used to store some metadata about cache records (like their tags or priority).

Sometimes we might however want to use the original `FileJournal` (for example in case our hosting doesn't support the SQLite). We achieve that by overwriting service `cache.journal` in our `config.neon`.

```neon
services:
    cache.journal:
        factory: Nette\Caching\Storages\FileJournal(%tempDir%)
```
