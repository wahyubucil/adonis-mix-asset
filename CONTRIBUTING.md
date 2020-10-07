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

Majority of AdonisJs core packages are written in Typescript. Having a brief knowledge of Typescript is required to contribute to the core. [Learn more](https://adonisjs.com/docs/contribution-guide#_coding_style) about the same.

## Fix bugs by creating PR's

We appreciate every time you report a bug in the framework or related libraries. However, taking time to submit a PR can help us in fixing bugs quickly and ensure a healthy and stable eco-system.

Go through the following points, before creating a new PR.

1. Create an issue discussing the bug or short-coming in the framework.
2. Once approved, go ahead and fork the REPO.
3. Make sure to start from the `develop`, since this is the upto date branch.
4. Make sure to keep commits small and relevant.
5. We follow [conventional-commits](https://github.com/conventional-changelog/conventional-changelog) to structure our commit messages. Instead of running `git commit`, you must run `npm run commit`, which will show you prompts to create a valid commit message.
6. Once done with all the changes, create a PR against the `develop` branch.

## Be a part of community

We welcome you to participate in the [forum](https://forum.adonisjs.com/) and the AdonisJs [discord server](https://discord.me/adonisjs). You are free to ask your questions and share your work or contributions made to AdonisJs eco-system. 

We follow a strict [Code of Conduct](https://adonisjs.com/community-guidelines) to make sure everyone is respectful to each other.

## Other notes

- Do not change version number inside the `package.json` file.
- Do not update `CHANGELOG.md` file.
- Do not update `.eslintrc.json` file. If something prevents you writing code, please create an issue for same.

## Need help?

Feel free to ask.
