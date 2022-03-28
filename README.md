![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Security Status](https://img.shields.io/security-headers?label=Security&url=https%3A%2F%2Fgithub.com&style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)

# ToDo list app

_Node.js project_

This project is for **educational** porpuses only. Pull request are welcome, but priority for project authors! Thank you for your cooperation!

Site published at:

## Project features

---

-   Github pages
-   CSS
-   JavaScript
-   HTML
-   Node.js

---

## Instalation

---

Frontend and backend must be installed separetly

`$ npm install`

Port for Frontend is set to 5000, in case to change port, go:

frontend -> packcage.json -> "scripts": {
"start": "dead-server --port=5000 --host=localhost"
},

next step, correct port:

frontend -> assets -> js -> common.js -> const url = 'http://localhost:5001'

Port for Backend is set to 5001. In case to change this port, go:

backend -> index.js -> app.listen(5001, () => {

---

## Authors

Rita: [Github] https://github.com/ritullia

## Code sample

```html
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ToDo list</title>
</head>
```

```css
.class {
    background-color: red;
}
```

```js
function sum(a, b) {
    return a + b;
}
```
