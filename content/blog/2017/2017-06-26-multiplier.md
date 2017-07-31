---
date: "2016-06-26"
draft: false
title: "Multiplier"
tags: ["components", "multiplier"]
type: "blog"
slug: "multiplier"
author: "Vojtěch Dobeš"
version: ">=2.0"
---

{{% perex %}}
Multiplier is a tool for dynamic creation of components.
{{% /perex %}}

Take a typical situation. Let's have a list of products in an e-shop. Now we want to create a form for each of the products, that would add that specific product to a basket. One of the possible ways how to do that is to wrap whole product list to a single form. Much more convenient way however is using the [Nette\Application\UI\Multiplier][multiplier-api] available starting Nette 2.0.

Multiplier allows you to conveniently define single factory for multiple components. It works on a principle of nested components where every component extending [Nette\ComponentModel\Container][container-api] can contain another components.

{{% tip %}}
See chapter about [component model][component-model] in documentation or [talk by Honza Tvrdík (in czech)][talk] for more insight.
{{% /tip %}}

The substance of Multiplier is that it acts as a parent, which can create its children dynamically using callback we give it in its constructor. See the example:

```php
protected function createComponentShopForm()
{
	return new Multiplier(function () {
		$form = new \Nette\Application\UI\Form;
		$form->addText('count', 'Product count:')
			->addRule($form::FILLED)
			->addRule($form::INTEGER);
		$form->addSubmit('send', 'Add to basket');
		return $form;
	});
}
```

We can now simply render separate form for every product in template. Each of the forms will be a unique component.

```html
{foreach $items as $item}
	<h2>{$item->title}</h2>
	{$item->description}

	{control shopForm-$item->id}
{/foreach}
```

The argument passed to macro `{control}` is in format which says:

1. get component `shopForm`
2. and from that component get a child `$item->id`

There is no `shopFrom` existing during first call of the first step yet, so its factory `createComponentShopForm` is called instead. A factory of a specific form (an anonymous function, which we passed to the Multiplier in its constructor) is then called on the obtained component (instance of Multiplier).

There will be no calls to `createComponentShopForm` during next iterations of `foreach` because component already exists. There will, however, be calls to the anonymous function, because we're looking for components' children and `$item->id` is different in every iteration. This will give us a new form every time.

The only thing remaining is to ensure for a form to add to basket really that product which is it supposed to. It is not doing that for now, because the form is the same for every product. For that we can use feature of Multiplier (and every factory in the Nette framework really) and that is that every factory gets the name of creating component as its first argument. That will be `$item->id` in our example, which is exactly that detail we need. So we just need to tweak the form factory a bit:

```php
protected function createComponentShopForm()
{
	return new Multiplier(function ($itemId) {
		$form = new Nette\Application\UI\Form;
		$form->addText('count', 'Product count:')
			->addRule($form::FILLED)
			->addRule($form::INTEGER);
		$form->addHidden('itemId', $itemId);
		$form->addSubmit('send', 'Add to basket');
		return $form;
	});
}
```


[multiplier-api]: https://api.nette.org/Nette.Application.UI.Multiplier.html
[container-api]: https://api.nette.org/Nette.ComponentModel.Container.html
[component-model]: https://doc.nette.org/en/2.4/components#toc-advanced-use-of-components
[talk]: https://pla.nette.org/cs/posobota-36-jan-tvrdik-komponenty
