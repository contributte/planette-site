---
date: "2015-12-13"
draft: false
title: "Cool urls and global route filters"
tags: ["router", "route", "url"]
type: "blog"
slug: "cool-urls-and-global-route-filters"
author: "Pavel Janda"
---

*This article was taken and translated from (paveljanda.com)[https://paveljanda.com].*

## Behaviour in dev mode

There may be a request to use custom looking urls in your project. Maybe it is a e-commerce project with urls like `en/category/another-category/super-tuper-hello-kitty-mug` or it could be a blog reflecting all tags in the url: `blog/kitten/cute/fluffy/2015-12-13-my-fluffy-day`. Either way, you probably noticed that there may be a variable count of segments in particular url. To route application like that, we may use global filter in the `Nette\Application\Routers\Route` class. You can read more about global route filter on the documentation web.

Make sure you have your router registered in DIC:

```yml
services:
    - App\RouterFactory
    router: @App\RouterFactory::createRouter
```

Now, how should your `App\RouterFactory` class look like?

```php
<?php

delcare(strict_types=1);

namespace App;

use Nette\Application\Routers\RouteList;
use Nette\Application\Routers\Route;
use Nette\Application\IRouter;

class RouterFactory
{

    private $urls = [
        'en/category/another-category/super-tuper-hello-kitty-mug' => [
            'presenter' => 'Products',
            'action' => 'detail',
            'id' => '1010',
            'lang' => 'en',
        ],
        'en/hello-kitty-pen' => [
            'presenter' => 'Products',
            'action' => 'detail',
            'id' => '1234',
            'lang' => 'en',
        ],
        'es/kitty-pen-in-spanish' => [
            'presenter' => 'Products',
            'action' => 'detail',
            'id' => '1234',
            'lang' => 'es',
        ],
    ];


    public function createRouter(): IRouter
    {
        $router = new RouteList;

        $router[] = new Route('[<url [a-z-0-9\/]+?>]', [
            null => [
                Route::FILTER_IN => [$this, 'urlIn'],
                Route::FILTER_OUT => [$this, 'urlOut']
            ]
        ]);

        return $router;
    }


    public function urlIn(array $params): ?array
    {
        $url = trim($params['url'], '/');

        if (isset($this->urls[$url])) {
            return $this->urls[$url];
        }

        return null;
    }


    public function urlOut(array $params): ?array
    {
        foreach ($this->urls as $url => $url_params) {
            if ($params == $url_params) {
                return ['url' => $url];
            }
        }

        return null;
    }
}
```

When we define route filter under the `null` key, it is called global filter and should receive/return all parameters including presenter and action. In `FILTER_IN`, we will receive an array with `url` and we shall return that `presenter`/`action` combination. The `FILTER_OUT` does the opposite.

But we should keep in mind couple of thing:

1) List of the urls with their parameters (`presenter`, `action`, `id`, `lang`) would be better to keep in database and then cache it to make the work with it faster.

2, Be carefoul with cutting url parameters in `urlOut` method. There could be more parameters that you think (your custom pagination params, native `do` parameter which leads to the presenter signal and so on).

3, When keeping in database old urls that will be redirected to the new ones, it may be more transparent to create a `Nette\Application\Application::$onError` event listener and redirect user requests here. You will recognize the "Page not found" exception by it's code (`$exception->getCode() === 404`).
