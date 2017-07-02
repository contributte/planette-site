---
date: "2014-07-03"
draft: false
title: "Blank page after upload on web server"
tags: ["faq", "hosting"]
type: "blog"
slug: "blank-page-after-upload-on-web-server"
author: "Armin Schmidtke"
---

Try these troubleshooting steps:

1. Clear your `temp/` folder
2. Check the write permissions for `log/` and `temp/`
3. Try to uncomment `RewriteBase` in your *.htaccess* file
4. Check the logs (folder `logs/`)
5. Enable Tracy
