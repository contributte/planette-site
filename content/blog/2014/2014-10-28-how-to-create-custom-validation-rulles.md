---
date: "2014-10-28"
draft: false
title: "How to create custom validation rulles"
tags: ["forms", "validation"]
type: "blog"
slug: "how-to-create-custom-validation-rulles"
---

Constants (DOMAIN, USER_IN_DOMAIN) contain name of static function, that call for validation.

Example "user in domain", show us, how work with parameters. 


```php

class DomainsRules
{
	const DOMAIN = 'DomainsRules::validateDomain';
	const USER_IN_DOMAIN = 'DomainsRules::validateUserInDomain';

	public static function validateDomain(\Nette\Forms\IControl $control)
	{
		// dump($control->getValue());
		// return TRUE or FALSE
	}

	public static function validateUserInDomain(\Nette\Forms\IControl $control, $domain)
	{
		// dump($control->getValue());
		// return TRUE or FALSE
	}
}
```


```php

$form->addText('domain', 'Domain:')
			->addRule(DomainsRules::DOMAIN, 'fill domain in format domain.tld');


$form->addText('user', 'User:')
			->addRule(DomainsRules::USER_IN_DOMAIN, 'user is not in domain nette.org', 'nette.org');

```
