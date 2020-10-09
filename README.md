# adonis-mix-asset
> Laravel Mix for Asset Bundler on AdonisJs v5

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

Adonis Mix Asset is assets bundler based on [Laravel Mix](https://laravel-mix.com) for AdonisJs v5 application.

[Laravel Mix](https://laravel-mix.com) is awesome assets bundler and easy to use!

If you need Laravel Mix for Adonis version lower than v5 you can use [adonis-mix](https://github.com/deathman92/adonis-mix).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
  - [Example Configuration](#example-configuration)
  - [View Helper](#view-helper)
  - [Bundle Assets](#bundle-assets)
- [Additional Information](#additional-information)
  - [Git Ignore](#git-ignore)
  - [Analyze Assets Size](#analyze-assets-size)
  - [Enable Hot Module Replacement (HMR)](#enable-hot-module-replacement-hmr)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Installation
```bash
npm i --save-dev adonis-mix-asset laravel-mix@next

# or if using Yarn
yarn add --dev adonis-mix-asset laravel-mix@next
```

NOTE: We're using Laravel Mix v6.0.0-beta because the configuration already supported Typescript compilation with Babel. So we don't need to change Webpack Config and create additional `tsconfig.json` in our AdonisJs v5 project.

### Setup
```bash
node ace invoke adonis-mix-asset
```
It will install the provider, command, and copy `webpack.mix.js` configuration file to the project's root folder.

## Usage

### Example Configuration
The configuration file is on `webpack.mix.js`.
```js
const mix = require('laravel-mix')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
mix
  .js('resources/assets/scripts/app.js', 'scripts')
  .sass('resources/assets/styles/app.scss', 'styles')
```

For more information on Laravel Mix features. See [Laravel Mix Documentation](https://laravel-mix.com/docs).

### View Helper
Use `mix` view helper to generate assets url. Example :
```handlebars
...
<head>
  <link rel="stylesheet" href="{{ mix('styles/app.css') }}" />
  <script src="{{ mix('scripts/app.js') }}"></script>
</head>
...
```
The view helper parses `mix-manifest.json` to generate assets url.

### Bundle Assets
Make sure before you run the command, you already configuring the `webpack.mix.js` file.

Bundle assets :
```bash
node ace mix
```
Bundle assets and watch for changes :
```bash
node ace mix --watch
```
Bundle assets for production :
```bash
node ace mix --production
```

## Additional Information

### Git Ignore
Add this to your `.gitignore` file :
```.gitignore
mix-manifest.json
```
Also, for example if you want to output your scripts on `public/scripts` and styles on `public/styles`, you need to add all of those folders to your `.gitignore` file. Example :
```.gitignore
public/scripts
public/styles
```

### Analyze Assets Size
If you want to analyze all of your asset sizes (usually for production assets). Run this command :
```bash
node ace mix --analyze --production
```
It will open your browser automatically and show an interactive treemap visualization of the contents of all your assets.

If the browser doesn't open automatically. You can open it on `127.0.0.1:8888`.

Analyzer preview :
![webpack bundle analyzer zoomable treemap](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)
Source : [webpack-bundle-analyzer documentation](https://github.com/webpack-contrib/webpack-bundle-analyzer#readme).

### Enable Hot Module Replacement (HMR)
First, read [Laravel Mix instructions](https://laravel-mix.com/docs/hot-module-replacement) about HMR.

Add this script to your `package.json` :
```json
...
"scripts": {
  ...
  "hot": "webpack-dev-server --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js"
  ...
}
...
```

And run dev server with :
```bash
npm run hot
```

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis-mix-asset.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-mix-asset "npm"

[license-image]: https://img.shields.io/npm/l/adonis-mix-asset?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
