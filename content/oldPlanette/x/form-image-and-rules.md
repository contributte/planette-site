---
date: ""
draft: false
title: "Form image and rules"
tags: ["snippet", "image", "form", "validation"]
type: "blog"
slug: "form-image-and-rules"
author: "Honza Černý"
---

```php
$image = $form->addUpload('image', 'Image:');

$image->addCondition(Form::FILLED)
    ->addRule(Form::IMAGE, 'Please select image file');
    ->addRule(Form::MIME_TYPE, 'Please select jpeg image file', 'image/jpeg')
    ->addRule(Form::MAX_FILE_SIZE, 'Max allowed file size is 2 MB.', '20000');


// requre on condition option
if (!$this->article) {
    // we need image for main article
    $image->addConditionOn($form['mainArticle'], Form::EQUAL, TRUE)
        ->setRequired('Please select image.');
}
```
