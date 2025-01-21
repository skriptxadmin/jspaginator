# jsPaginator
## Description 
jspaginator is an open-source, lightweight JavaScript library for creating paginated tables or any items. Designed as an alternative to heavy libraries like DataTables, it offers a reduced size, no external dependencies, and extensive configuration options for a seamless developer experience.
Its small footprint ~6KB ensures rapid loading times and makes it particularly suited for projects where performance and simplicity are paramount.

## Features

- **Lightweight**: Minimal library size, ensuring faster load times.
- **No Dependencies**: Standalone library – no need for jQuery or other external libraries.
- **Customizable**: Extensive configuration options to tailor the paginator to your needs.
- **Fast Rendering**: Optimized for large datasets with minimal overhead.
- **Responsive**: Works across all modern devices and browsers.
- **Theming Support**: Easily customize the appearance of the table and pagination controls.
- **API Support**: Fetch and render data dynamically from server-side APIs.



## Getting Started

```
npm i @skriptx2/jspaginator
```

## Demos

### Vanilla html

Load your script file with type =  module

```html

<script type="module" src="./script.js"></script>

```

use **jspaginator.module.js** file to import paginator

```js

import { Paginator} from '../assets/jspaginator.module.js';

```
#### Live Example

https://stackblitz.com/edit/jspaginator-vanillahtml?file=index.html

### React JS

https://stackblitz.com/edit/jspaginator-react?embed=1&file=src%2FApp.tsx

### Angular Example

https://stackblitz.com/edit/jspaginator-angular?embed=1&file=src%2Fmain.ts


### Vue Example

https://stackblitz.com/edit/jspaginator-vue?embed=1&file=src%2Fcomponents%2FTable.vue

## Config Options
```js
config:{
infoText:string;
itemsPerPage:number;
classNames:{
    active?:string,
    wrapper?: string,
    nav?:string,
    ul?:string,
    li?:string,
    button?:string,
    summary?:string,
    span?:string,
    selectDiv?:string,
    select?:string,
},
totalItems:number,
filtered:number,
html: {
    prev?:string|boolean,
    next?:string|boolean,
    first?:string|boolean,
    last?:string|boolean,
    number?:string|boolean,
    maxNumbers?:any
},
onPageChange:Function;
currentPage:number;
server:boolean;
}
```

## License
This project is licensed under the MIT License.

## Support
If you encounter any issues, feel free to open an issue in the GitHub Issues section. For discussions or suggestions, join our community on Discussions.
