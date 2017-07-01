---
date: "2014-06-30"
draft: false
title: "Component separate rendering of js and html content"
tags: ["latte", "component"]
type: "blog"
slug: "component-separate-rendering-of-js-and-html-content"
---

@layout.latte
```latte
{control test:HTML}
{control test:JS}
```

TestComponents.php
```php

namespace FrontModule\Components;

use Nette\Application\UI\Control;
use Nette\ComponentModel\IContainer;

/**
 * Description of TestComponents
 */
class TestComponents extends Control {

    /**
     * @param IContainer $parent
     * @param string $name
     */
    final function __construct(IContainer $parent = NULL, $name = NULL) {
        parent::__construct($parent, $name);
    }

    /**
     * @see Nette\Application\Control#render()
     * @return void
     */
    public function render() {
        $this->renderJS();
        $this->renderHTML();
    }

    /**
     * @return void
     */
    public function renderJS() {
        $this->template->setFile(dirname(__FILE__) . '/js.latte');
        $this->template->render();
    }

    /**
     * @return void
     */
    public function renderHTML() {
        $this->template->setFile(dirname(__FILE__) . '/template.latte');
        $this->template->render();
    }

}
```
