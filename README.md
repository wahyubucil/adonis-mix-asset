# Adonis Mix Asset
> Laravel Mix for Asset Bundler on AdonisJS v5

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

Adonis Mix Asset is an assets bundler based on [Laravel Mix](https://laravel-mix.com) for AdonisJS v5 application.

[Laravel Mix](https://laravel-mix.com) is an awesome assets bundler and easy to use!

If you need Laravel Mix for AdonisJS version lower than v5 you can use [adonis-mix](https://github.com/deathman92/adonis-mix).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
  - [Example Configuration](#example-configuration)
  - [View Helper](#view-helper)
  - [Compile Assets](#compile-assets)
- [Additional Information](#additional-information)
  - [Gitignore](#gitignore)
  - [Analyze Assets Size](#analyze-assets-size)
  - [Enable Hot Module Replacement (HMR) / Hot Reloading](#enable-hot-module-replacement-hmr--hot-reloading)
  - [Use Another Mix Configuration](#use-another-mix-configuration)
  - [Tips on Using Typescript Asset](#tips-on-using-typescript-asset)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

### Installation
```bash
npm i adonis-mix-asset && npm i --save-dev laravel-mix

# or if using Yarn
yarn add adonis-mix-asset && yarn add --dev laravel-mix
```

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

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJS
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

### Compile Assets
Make sure before you run the command, you already configuring the `webpack.mix.js` file, and run `node ace serve` or `node ace build`.
 
Build assets :
```bash
node ace mix:build
```
Build assets and watch for file changes :
```bash
node ace mix:watch
```
Build assets for production :
```bash
node ace mix:build --production
```

## Additional Information

### Gitignore
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
If you want to analyze all of your asset sizes for production. Run this command :
```bash
node ace mix:build --analyze --production
```
It will open your browser automatically and show an interactive treemap visualization of the contents of all your assets.

If the browser doesn't open automatically. You can open it on [127.0.0.1:8888](http://127.0.0.1:8888).

Analyzer preview :
![webpack bundle analyzer zoomable treemap](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)
Source : [webpack-bundle-analyzer documentation](https://github.com/webpack-contrib/webpack-bundle-analyzer#readme).

### Enable Hot Module Replacement (HMR) / Hot Reloading
First, read [Laravel Mix instructions](https://laravel-mix.com/docs/hot-module-replacement) about HMR.

Run this command to enable HMR :
```bash
node ace mix:watch --hot
```

### Use Another Mix Configuration
If you want to use another Mix configuration, you can use `--mix-config` option either on `mix:build` or `mix:watch`. Example :
```bash
node ace mix:build --mix-config prod/webpack.mix.js
node ace mix:watch --mix-config prod/webpack.mix.js
```

### Tips on Using Typescript Asset
If you're planning to use Typescript asset for your Front-End, here are some tips to get started.

For example if you want to put your scripts on `resources/assets/scripts`, then you need to create `tsconfig.json` in those folder. That way, it will prevent conflict between your Front-End script and Back-End script.

Here's an example `tsconfig.json` you can use :
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "incremental": true,
    "noUnusedParameters": true,
    "declaration": false,
    "strictNullChecks": true
  },
  "include": ["./"]
}
```

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis-mix-asset.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-mix-asset "npm"

[license-image]: https://img.shields.io/npm/l/adonis-mix-asset?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
