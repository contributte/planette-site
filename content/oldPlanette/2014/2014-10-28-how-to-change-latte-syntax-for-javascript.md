---
date: "2014-10-28"
draft: false
title: "How to change latte syntax for JavaScript"
tags: ["snippet", "latte", "javascript"]
type: "blog"
slug: "how-to-change-latte-syntax-for-javascript"
author: "Honza Černý"
---

```latte
<script n:syntax="double">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-12345678-12', 'domain.com');
{{if $user->isLoggedIn()}}ga('set', 'dimension1', {{$user->identity->username}});{{/if}}
ga('send', 'pageview');
</script>
```
