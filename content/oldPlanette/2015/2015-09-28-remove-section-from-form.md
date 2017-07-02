---
date: "2014-09-28"
draft: false
title: "Remove section from Form"
tags: ["form"]
type: "blog"
slug: "remove-section-from-form"
author: "Honza Černý"
---

In form factory call:

```php
$user = $form->addContainer('user');
$user->addText('username', 'Username');
```

Everything added to container $user is now in own namespace. You can separate it in values processing like this:

```php
$userValues = array_pick($values, 'user');
```

And this is array_pick:

```php
/**
 * Pick element from the array by key and return its value.
 * @param  array
 * @param  string|int array key
 * @param  mixed default value when item is not present
 * @return mixed
 * @throws Nette\InvalidArgumentException if item does not exist and default value is not provided
 */
function array_pick(& $arr, $key, $default = NULL)
{
    if (array_key_exists($key, $arr)) {
        $value = $arr[$key];
        unset($arr[$key]);
        return $value;

    } else {
        if (func_num_args() < 3) {
            throw new Nette\InvalidArgumentException("Missing item '$key'.");
        }
        return $default;
    }
}
```


from foxycode [September 17, 2015 3:00 AM](https://gitter.im/nette/nette?at=55fa10c318e0111d7e4f408b)
