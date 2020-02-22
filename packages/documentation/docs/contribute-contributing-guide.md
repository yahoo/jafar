---
id: contributing-guide
title: Contributing Guide
sidebar_label: Contributing Guide
---

In this doc, we'll cover up the steps that need to be followed in order to contribute Jafar.

## Code of Conduct

Please refer to the [Code of Conduct](code-of-conduct) doc for information about behavior expectation.

## File an Issue

Before filing a new issue, please verify if a similar issue already exists in the issues tab. 
If an issue is not assigned and no one comment about planning to fix the issue - leave a comment stating that you intend to work on it in order to save other people duplicate effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

For new feature suggestion - please mention a real life usage example, to establish the need for it.

> **Note:** `Breaking changes` - should first be discussed and agreed by our team. We can do it via issues or mail to Jafar's [maintainers](https://github.com/yahoo/jafar/blob/master/README.md#maintainers).

## Work on an Issue

Follow these steps while working on an issue:

#### Getting Started

Fork the repository and create your branch from master.
Download forked repository, and run `npm run bootstrap` from root directory to initialize all packages. 
Init builds all packages to a `dist` folder and link all packages to each other's `dist` folder.
Some packages include a demo website, run `npm start` to see them and use them during development.

#### Update Code

Change the code in order to fullfil an issue needs. Keep in mind that Jafar is a `monorepo` - meaning a change in a specific package might affect other packages, or require other packages updates. For example - changing `@jafar/form` package, might affect or require additional change in `@jafar/react-form` package. See Jafar's [packages](https://yahoo.github.io/jafar/docs/packages.html) structure for more info.

- To test a change in one package on another package run `npm run build-package` on the changed package to update its dist folder which is linked to other packages that depend on it.
- We try to keep `@jafar/react-component` as generic as possible. We also expect all the params under state to be stringify (for example, don't pass components or functions in the state object) - because we want our common components to be stateless and support persistency.

#### Add Tests

Each change should be backed up with unit tests (add new tests or update ones) and potential e2e test if needed. Each package has `tests` folder, containing all package's unit tests. Some packages has a `src/website/demos` that contains e2e tests for a demo.

#### Verify your Change

We expect you to verify you change prior to submitting a pull:
- Run `npm run lint` on each updated package, and fix lint issues (run `npm run lint-fix` to auto fix most of the issues).
- Run `npm run coverage -- --watchAll` on each updated package, to run unit tests and verify coverage is not hurt. Under each package there is a `coverage` folder. Open coverage/lcov-report/index.html to view full coverage report.
- On each updated package - if `e2e` script exists in package.json - Run `npm start` in one terminal tab, and then `npm run e2e` on another tab - to verify end to end tests.
- Verify all potential affected packages e2e tests. For example - when changing `@jafar/form` - verify also `@jafar/react-form` and `@jafar/react-layout` e2e tests. Steps to verify:
  - Update the `dist` folder of the changed package. For example run `npm run build-package` from `@jafar/react-form`.
  - From the tested package (For example from `@jafar/react-form`) run `npm start` in one terminal tab, and then `npm run e2e` on another tab - to verify end to end tests.

#### Submit Pull Request

Submit a pull request directly to the `master` branch. Jafar's team monitor, review and merge pull requests.

## Our process

The following steps are done by Jafar's team:

#### Monitor and maintain Issues and Pull requests

- We monitor issues and pull requests frequently.
- We review pull requests and merge them when all necessary changes are done.
- We comment on issues, link issues to pull requests and close issues when they are done.

#### Handle new Version

After each bulk of changes we will:

- Update relevant documentation.
- Update CHANGELOG.md
- Update all packages to a new and same version.
- Publish packages to npm registry.
- Create a new release on github for each meaningful change

## License

By contributing to Jafar, you agree that your contributions will be licensed under its MIT license.