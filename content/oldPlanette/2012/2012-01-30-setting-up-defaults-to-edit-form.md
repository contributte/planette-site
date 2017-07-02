---
date: "2012-01-30"
draft: false
title: "Setting up defaults to edit form"
tags: ["config", "database", "dibi"]
type: "blog"
slug: "setting-up-defaults-to-edit-form"
author: "Martin Zlámal"
---

Setting up defaults in factory component / form is wrong. What's the right way to do so?

```php
class FooPresenter extends BasePresenter
{
        protected function loadItem($id)
        {
                $item = $this->getContext()->itemService->find($id);
                if (!$item) {
                        $this->flashMessage("Item with id $id does not exist", 'error');
                        $this->redirect('default'); // aka items list
                }
                return $item;
        }

        protected function createComponentRecordForm()
        {
                $form = new Form;
                $form->addText(...);
                // ...
        }

        public function actionEdit($id)
        {
                $item = $this->loadItem($id);
                $defaults = $this->someMagicHere($item);
                $this['recordForm']->setDefaults($defaults);
        }
}
```
