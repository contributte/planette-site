---
date: "2015-06-30"
draft: false
title: "Add data atributes to options elements in select element"
tags: ["form", "data-attribute", "select"]
type: "blog"
slug: "add-data-atributes-to-options-elements-in-select-element"
author: "Honza Černý"
---

Sometimes you need more data in options in select elements like :

```html
<select id="country-select" name="country">
    <option data-lat="53.412910" data-lon="-8.000000" data-zoom="6" value="102">Czech Republic</option>
    <option data-lat="53.094024" data-lon="-1.768799" data-zoom="5" value="77">Slovakia</option>
</select>
```

So, there is simple solution, use `\Nette\Utils\Html` for items like:

```php
use Nette\Utils\Html;

$contries = array(
    102 => Html::el()->setText('Czech republic')->data('lon', '-8.000000')->data('lat', '53.412910')->data('zoom', '6'),
     77 => Html::el()->setText('Slovakia')->data('lon', '-1.768799')->data('lat', '53.094024')->data('zoom', '5'),
)

$form->addSelect('country', 'Country:', $countries);
```

from: http://forum.nette.org/cs/22874-select-a-options-data-attributy
