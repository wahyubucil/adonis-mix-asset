# Contributing

We love pull requests. And following this guidelines will make your pull request easier to merge

- [Prerequisites](#prerequisites)
- [Coding style](#coding-style)
- [Fix bugs by creating PR's](#fix-bugs-by-creating-prs)
- [Be a part of the community](#be-a-part-of-community)
- [Other notes](#other-notes)

## Prerequisites

- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor to make sure it uses correct settings.
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.

## Coding style

AdonisJS packages are written in Typescript. Having a brief knowledge of Typescript is required to contribute. We make use of [standard](https://standardjs.com/) to lint our code. Standard does not need a config file and comes with set of non-configurable rules.

## Fix bugs by creating PR's

We appreciate every time you report a bug in the framework or related libraries. However, taking time to submit a PR can help us in fixing bugs quickly and ensure a healthy and stable eco-system.

Go through the following points, before creating a new PR.

1. Create an issue discussing the bug or short-coming in the framework.
2. Once approved, go ahead and fork the REPO.
3. Make sure to start from the `develop`, since this is the up to date branch.
4. Make sure to keep commits small and relevant.
5. We follow [conventional-commits](https://github.com/conventional-changelog/conventional-changelog) to structure our commit messages. Instead of running `git commit`, you must run `npm run commit`, which will show you prompts to create a valid commit message.
6. Once done with all the changes, create a PR against the `develop` branch.

## Be a part of community

We welcome you to participate in the [forum](https://github.com/adonisjs/core/discussions) and the AdonisJS [discord server](https://discord.com/invite/vDcEjq6). You are free to ask your questions and share your work or contributions made to AdonisJS eco-system.

## Other notes

- Do not change version number inside the `package.json` file.
- Do not update `.eslintrc.json` file. If something prevents you writing code, please create an issue for same.
- If you found an error while committing with `npm run commit` like this `.husky/pre-commit: line 2: .husky/_/husky.sh: No such file or directory`. You need to run : `npx husky install`

## Need help?

Feel free to ask.
