#### Plurals in database

Check how words are transformed into plural:

```
$ node
Welcome to Node.js v14.18.3.
Type ".help" for more information.
> var inflection = require('inflection')
undefined
> inflection.pluralize('functionality')
'functionalities'
> inflection.pluralize('person')
'people'
>
```
