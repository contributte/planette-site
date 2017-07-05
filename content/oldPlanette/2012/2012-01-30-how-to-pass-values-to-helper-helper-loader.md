---
date: "2012-01-30"
draft: false
title: "How to pass values to helper / Helper Loader"
tags: ["latte", "template"]
type: "blog"
slug: "how-to-pass-values-to-helper-helper-loader"
author: "Martin Zlámal"
---

If you need to pass a helper already defined values or database results, you can do it through anonymous function.

### Static list


```php
$genderTypes = array(
        'ma' => 'Male',
        'f' => 'Female',
);

$this->template->registerHelper('gender', function($gender) use($genderTypes) {
        if (isset($genderTypes[$gender])) {
                return $genderTypes[$gender];
        }
        return 'gender unknown';
});
```

### Items list from database

```php
$categoryList = $this->models->categories->fetchAll();

$this->template->registerHelper('category', function($categoryId) use($categoryList) {
        if (isset($categoryList[$categoryId])) {
                return $categoryList[$categoryId];
        }
        return 'unknown';
});
```

## Helper Loader

Another and easily extensible solution is to use your own [helper loader](https://doc.nette.org/en/templating#toc-helper-loader).  You can extend the class and simply test them and move to other projects.


Following example respects **Dependency Injection**, so it's passing only required services, you can use to **access database**, **predefined parameters**, **path to dirs `temp`, `app`** etc. Our loader contains helper profilePicture, which based on file name return route to profile photo, resp. to default "no profile photo" file.

```php
namespace App;

class Helpers extends Nette\Object
{
        /** @var string */
        private $wwwDir;

        /** @var Nette\Http\IRequest */
        private $httpRequest;

        public function __construct($wwwDir, Nette\Http\IRequest $httpRequest)
        {
                $this->wwwDir = $wwwDir;
                $this->httpRequest = $httpRequest;
        }

        /**
         * Method we will register as callback
         * in method $template->registerHelperLoader().
         */
        public function loader($helper)
        {
                if (method_exists($this, $helper)) {
                        return callback($this, $helper);
                }
        }

/* === Following particular helpers === */

        /**
         * Display profile photos
         *
         * <code>
         * <img src="{'JohnDoe.jpg'|profilePicture}">
         * </code>
         *
         * @param  string name of file with photo
         * @return string route to profile photo of default picture
         */
        public function profilePicture($fileName)
        {
                $basePath = $this->httpRequest->url->scriptPath;
                if (is_file($this->wwwDir . '/photos/' . $fileName)) { // profile photo exits
                        return $basePath . '/photos/' . $fileName;
                } else { // profile photo doesn't exist
                        return $basePath . '/photos/noPhoto.jpg';
                }
        }
}
```

{{% tip %}}
If you need use presenter functions in helper (**redirect()**, **link()** etc.), zou have to pass service `@application` through the `__construct`.
Presenter will be accessible through `$application->getPresenter()` during template rendering.
{{% /tip %}}


### How to register helper loader?

Set it as a service first in application config.

```yaml
common:
    services:
        myTemplateHelpers:
            factory: App\Helpers( %wwwDir%, @httpRequest )
```


Than we can register `Helper loader` in BasePresenter.php by callback to our method loader() into Template::registerHelperLoader().

```php
abstract class BasePresenter extends Nette\Application\UI\Presenter
{

    public function createTemplate($class = NULL)
    {
        $template = parent::createTemplate($class);
        $template->registerHelperLoader(callback(
            $this->context->myTemplateHelpers,
            'loader'
        ));
        return $template;
    }
}
```
