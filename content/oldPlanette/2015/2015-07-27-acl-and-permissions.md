---
date: "2015-07-27"
draft: false
title: "ACL and permissions"
tags: ["acl", "permissions", "annotation"]
type: "blog"
slug: "acl-and-permissions"
author: "Pavel Janda"
---

Let's start with creating an empty project: `composer create-project nette/web-project myweb`.

Out of the box, you can ask Nette Framework if the user has some roles and whether he is logged in or not:

```php
<?php

namespace App\Presenters;

use Nette\Application\UI\Presenter;

class HomepagePresenter extends Presenter
{

    public function actionDefault(): void
    {
        dump($this->user->isLoggedIn()); // false
        dump($this->user->isInRole('admin')); // false

        die;
    }
}
```

But we would gone crazy if we have to ask for user's role each and every time trying to find out user's permission for particular action.
Nette provides really pleasant way how to deal with application's **ACL**. It's called `Nette\Security\Permission`. :P

We may add some example roles and resources when creating an object of `Permission` class:

```php
<?php

namespace App\Security;

use Nette\Security\Permission;

class AuthorizatorFactory
{

    private const ROLE_GUEST = 'guest';
    private const ROLE_CLIENT = 'client';


    public function create(): Permission
    {
        $acl = new Permission;

        /**
         * Roles 1*
         */
        $acl->addRole(self::ROLE_GUEST);
        $acl->addRole(self::ROLE_CLIENT, self::ROLE_GUEST); // 2*

        /**
         * Resoures 3*
         */
        $acl->addResource('Front');
        $acl->addResource('Front:Homepage', 'Front');
        $acl->addResource('Front:About', 'Front');

        $acl->addResource('Client');
        $acl->addResource('Client:Sign', 'Client');
        $acl->addResource('Client:Profile', 'Client');


        /**
         * Permissions 4*
         */
        $acl->allow(self::ROLE_GUEST, 'Front');
        $acl->allow(self::ROLE_GUEST, 'Client:Sign');

        $acl->allow(self::ROLE_CLIENT,  Permission::ALL, Permission::ALL);

        return $acl;
    }

}
```

What have we done in this step:

1. Two user roles were created:
    - `guest`: that is a default role name (of unsigned user) in Nette Framework
    - `client`: role defined by us == logged user
2. Role `client` inherits from the `guest` role (`$acl->addRole(self::ROLE_CLIENT, self::ROLE_GUEST);`)
3. There are two main resources (`Front`, `Client`) and other that inherit from these two:
    - `Front:Homepage`
    - `Front:About`
    - `Client:Sign`
    - `Client:Profile`
4. `guest` role is able to look at everything in `Front` resource (`$acl->allow(self::ROLE_GUEST, 'Front');`) but also the `Client:Sign` (`$acl->allow(self::ROLE_GUEST, 'Client:Sign');`) resource. The `Client:Sign is there because unsigned user has to be allowed to log in`. Role `client` is allowed to do everything in the world (`$acl->allow(self::ROLE_CLIENT,  Permission::ALL, Permission::ALL);`).

Cool, we have a Permission object, what now? Let's tell Nette that it can use a `authorizator`:

```yml
services:
    ...
    - App\Security\AuthorizatorFactory
    -
        class: Nette\Security\Permission
        factory: @App\Security\AuthorizatorFactory::create
```

By default, Nette looks into `DIC` and tries to find a service implementing `Nette\Security\IAuthorizator`. The `Nette\Security\Permission` class implements that interface and we have registered this class into `DIC` so it will be automatically passed to an object of type `Nette\Security\User` available in each `Presenter` class.

Try it out in action:

```php
<?php

namespace App\Presenters;

use Nette\Application\UI\Presenter;

class HomepagePresenter extends Presenter
{

    public function actionDefault()
    {
        dump($this->user->isAllowed('Front:Homepage')); // => true
        dump($this->user->isAllowed('Client'));           // => false
        dump($this->user->isAllowed('Client:Sign'));      // => true

        die;
    }

}
```

Right. Now we have to automate the process a bit (as I said before - we don't want to call `$this->user->isAllowed('...')` each time manually).
I will create a `AbstractPresenter` class for that purpose (it will be empty for now):

```php
<?php

namespace App\Presenters;

use Nette\Application\UI\Presenter;

class AbstractPresenter extends Presenter
{

}
```

And some other presenters:

```php
<?php

namespace App\Presenters;

/**
 * @resource Front:Homepage
 */
class HomepagePresenter extends AbstractPresenter
{

}
```

```php
<?php

namespace App\Presenters;

/**
 * @resource Front:About
 */
class AboutPresenter extends AbstractPresenter
{

}
```

```php
<?php

namespace App\Presenters;

/**
 * @resource Client:Sign
 */
class SignPresenter extends AbstractPresenter
{

}
```

```php
<?php

namespace App\Presenters;

/**
 * @resource Client:Profile
 */
class ProfilePresenter extends AbstractPresenter
{

}
```

Do you see the annotation? That is our own way how to define a resource on presenter class. Beware! You can do it your own way, the annotation is just one among many other ways how to define presenter resource (You can use for example the Nette naming convention: `$presenter->getName()`).

We may make the SignPresenter a little bit more functional..

```php
<?php

namespace App\Presenters;

use App\Security\AuthorizatorFactory;
use Nette\Application\UI\Form;
use Nette\Security\Identity;
use Nette\Utils\ArrayHash;

/**
 * @resource User:Sign
 */
class SignPresenter extends AbstractPresenter
{

    /**
     * @persistent
     */
    public $backlink = '';


    public function actionIn()
    {
        if ($this->user->isLoggedIn()) {
            $this->redirect('Profile:');
        }
    }


    public function actionOut()
    {
        $this->user->logout();
        $this->flashMessage('You were signed out');
        $this->redirect('in');
    }


    public function createComponentSignInForm()
    {
        $form = new Form;

        $form->addText('username', 'Username:');
        $form->addPassword('password', 'Password:');
        $form->addSubmit('submit', 'Submit');

        $form->onValidate[] = [$this, 'validateCreditians'];
        $form->onSuccess[] = [$this, 'signInFormSucceeded'];

        return $form;
    }


    public function validateCreditians(Form $form, ArrayHash $values)
    {
        if ($values->username !== 'franta' || $values->password !== 'heslo') {
            $form->addError('Invalid credentials');
        }
    }


    public function signInFormSucceeded(Form $form, ArrayHash $values)
    {
        $identity = new Identity(1, AuthorizatorFactory::ROLE_USER, [
            'username' => $values->username
        ]);

        $this->user->login($identity);

        if ($this->backlink) {
            $this->restoreRequest($this->backlink);
        }

        $this->redirect('Homepage:');
    }

}
```

We can not forgot a tiny template where we put the sign form (file `app/presenters/templates/Sing/in.latte`):

```
{block content}
    {control signInForm}
{/block}
```

Cool. But we still didn't automate the authorization process. We will start by implementing method `::checkRequirements()` in our `AbstractPresenter`. Why exactly `checkRequirements`? Becase it is meant for it (see `Nette\Application\UI\Presenter::checkRequirements()`).

```php
<?php

namespace App\Presenters;

use Nette\Application\UI\Presenter;
use Nette\Application\ForbiddenRequestException;
use Nette\Reflection;

class AbstractPresenter extends Presenter
{

        /**
         * Check authorization
         * @return void
         */
        public function checkRequirements($element)
        {
            if ($element instanceof Reflection\Method) {
                /**
                 * Check permissions for Action/handle methods
                 *
                 *  - Do not that (rely on presenter authorization)
                 */
                return;
            } else {
                /**
                 * Check permissions for presenter access
                 */
                $resource = $element->getAnnotation('resource'); // 1*
            }

            if (!$this->user->isAllowed($resource)) { // 2*
                if (!$this->user->isLoggedIn()) {
                    $this->redirect('Sign:in', ['backlink' => $this->storeRequest()]);
                } else {
                    throw new ForbiddenRequestException;
                }
            }
        }

}
```

This method is called twice in the application's lifecycle. Once with a `Presenter` class reflection in the method argument and second with particular method reflection (`::actionDefault`, `::actionOut`, ...). We will ignore the call with action method reflection for now and focus on the call with presenter class reflection. Steps written in the snippet above:

1. Find out the value of presenter annotation `@resource`
2. Is user allowed to access the resource? If so, continue executing script. Of not:
    - When user is logged in, tell him he has no access to this resource (404)
    - Unsigned user is redirected to login

Now the application is ready for testing. Open your browser and navigate to homepage url: `/`. Great, you're on homepage. Now try `/profile`. Bam! The application will redirect you to `/sign/in` and after submitting login form there will be another redirect - to the `/profile` url - cool! Why is that?
First of all, `Presenter` class can store the request in session and return unique hash: `$this->redirect('Sign:in', ['backlink' => $this->storeRequest()]);`. And after login we will simply restore the request by given backlink hash: `$this->restoreRequest($this->backlink);`.

There is still some error about missing template in `Client:Profile`, but I think you can manage to create it on your own. :)

And that's it!

----

That was just an simple way how to implement `ACL` in the Nette application, sure it can be done in more complex ways with more functioanality. For example:

- We can specify `privileges` in particular resources (`$this->allow(self::ROLE_GUEST, 'Front', ['read', 'write]);`) and use these privileges in action methods annotation. We would check user's permissions in the first if-clause of `AbstractPresenter::checkRequirements()` method
- Getting presenter/method annotation could be more extensive - we mau implement some annotation inheritency for more modular applications
- Proper way how to implement **dynamic** ACL is again in the `AuthorizatorFactory` class - as it is a service registered in `DIC`, just add dependencies (database probably) in the `__constructor` method and use the database to load user's permissions
