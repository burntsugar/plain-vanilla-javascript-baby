# Plain Vanilla JavaScript Baby

Proof of concept app using vanilla JavaScript and the [public Github REST API](https://developer.github.com/v3/#current-version).

<br>

## ❄️ Status: 👷‍♀️ Development

<br>

## ❄️ Installation

1. `git clone <this_url> && cd <repo_name>`
1. `npm install` (node)
1. `npm install lite-server --save-dev` (small dev-only server)

`npm run dev` to launch app on `http://localhost:3000`.

<br>

If you wish to run Jest tests, you will require Jest libs and @babel/preset-env (for testing ES6 modules)...

1. `npm install jest --save-dev`
1. `npm install jest-extended --save-dev`
1. `npm install @babel/preset-env`

`npm test` to run all tests.

<br>

If you wish to integrate with [linc](https://linc.sh/) CI tool...

1. `npm install --dev @fab/static`

<br>

If you wish to lint with eslint and Google...

1. `npm install eslint --save-dev`
1. `npm install eslint-config-google --save-dev`

`./node_modules/.bin/eslint src/ ` to lint all modules.

<br>

## ❄️ Dependencies

* Node.js 13.5.0

## ❄️ Dev dependencies

* @babel/preset-env 7.7.7
* eslint 6.8.0
* eslint-config-google 0.14.0
* jest 24.9.0
* jest-extended 0.11.2
* lite-server 2.5.4

## ❄️ Goals

* Jest test coverage...
    * Mocking complex objects
    * Exported functions and modules

* Integration with CI/CD tool => [linc](https://linc.sh/).

* ES6x features, style and convention...
    * Promises
    * async/await
    * import/export

* Storage and caching...
    * Local storage
    * 1 minute caching policy

* Minimise use of global namespace...
    * Prefer revealing Module Pattern (RMP)

* JSDoc implementation comment coverage.

* Code style...
    * [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#introduction)

## ❄️ App Features:

1. Display Github profile details and avatar from [https://api.github.com/users/v3](https://api.github.com/users/v3).
2. Cache data to client.

## ❄️ Browser apis

* [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

<hr>

<br>

### 🍦 about localStorage

justification:

* sinlge-page app
* data is publicly available
* data size does not exceed 1.2MB

<br>

<hr>

*Ice ice baby, Ice ice baby, All right stop, Collaborate and listen, Ice is back with my brand new invention, Something grabs a hold of me tightly, Flow like a harpoon daily and nightly, Will it ever stop?, Yo, I don't know, Turn off the lights and I'll glow, To the extreme, I rock a mic like a vandal, Light up a stage and wax a chump like a candle*

**Dance**

![Vanilla Ice - To The Extreme album cover](readme.jpg)