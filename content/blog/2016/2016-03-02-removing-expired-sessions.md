---
date: "2016-03-02"
draft: false
title: "Removing expired sessions"
tags: ["session"]
type: "blog"
slug: "removing-expired-sessions"
author: "David Matějka"
---

If you ever wondered why is the session being removed even if you extended its expiration in `config.neon`. The culprit is likely session removing in PHP itself.

## Garbage collection

The PHP contains GC for session removing. There are few [configuration directives][php-sessions] which can affect that. We're interested mainly in `session.gc_maxlifetime`, `session.save_path`, `session.gc_probability` and `session.gc_divisor`.

The first, as name suggests, defines session lifetime.  
The last two then defines probability in which session GC is run. When `gc_probability` is `1` and `gc_divisor` is `100`, then the GC will be run in about 1 in 100 requests. E.g. there is 1% chance that GC will be run.

When GC is being run, the PHP will start to remove session files. The directory where session files are stored is defined by `session.save_path`.  
During the session cleanup the value from `session.gc_maxlifetime` is used as a session lifetime. That is why it doesn't matter to what value the session lifetime was set to during its creation. This can be a problem mainly in case when more applications shares the same directory as s session storage, but have different session lifetimes. In that case the application with shorter session lifetime will remove sessions from the other application.

## Debian, Ubuntu - cron

A little different situation is on Debian-based systems (and maybe others). Here the default value for `session.gc_probability` is set to `0` and PHPs' session GC is not run at all. Session cleanup is then handled by system cron script. That of course completely ignores applications' settings and uses `session.gc_maxlifetime` from `php.ini`.

## Own `session.save_path`

In case when server, we use to host our application, has low session lifetime and we cannot directly affect that, we can bypass that by setting different path for session files using `session.save_path`.  
 Be aware, however, that now we have to take care of session removing. Mainly when system cron was taking care of session removing.  
 We can do that by either writing our own cron script.  
 Or simply by enabling GC - by setting `session.gc_probability` to `1`.

## Other session handlers

Saving sessions as files isn't the only way. One of the other solutions is to use key-value database Redis.  
This database supports setting different TTL (time-to-live) per record. So every record can have specific expiration time and Redis will also handle their cleanup.


[php-sessions]: http://php.net/manual/en/session.configuration.php
