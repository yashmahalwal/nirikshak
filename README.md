# Nirikshak

Test your REST APIs with ease

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
![Code coverage: branch](badges/badge-branches.svg)
![Code coverage: functions](badges/badge-functions.svg)
![Code coverage: lines](badges/badge-lines.svg)
![Code coverage: statements](badges/badge-statements.svg)

## Introduction

<!-- TODO: add screenshot -->

Nirikshak is a REST API testing framework. It leverages the REST semantics and provides autonomous testing capabilities. That means you get to kick back and relax while we do all the hard work for you.

**_Disclaimer: The project is still in infancy and is limited in scope and capabilities. But you can extend the framework to suit your needs. For more, read on._**

## What exactly does it do?

![Nirikshak flow](docs/Nirikshak-intro.png)

Nirikshak generates test cases, runs them and analyses them for you. The flow can be summarised as below:

1.  It generates a generic suite of test cases on initialisation.
2.  You provide a description of your API to Nirikshak.
3.  It reads that description on runtime and links it to the test cases.
4.  It invokes [jest](https://jestjs.io/) to run your tests cases.
5.  It analyses the test log generated and provides you with a report.

## What is the scope of this tool?

Nirikshak works on APIs that:

1.  Are written in typescript
2.  Use JSON as serialization format
3.  Perform CRUD operations on resources
4.  Follow REST standards

Nirikshak performs unit functional tests on them. At a glance, this seems very restrictive. But the best part is that the framework is extentsible. We expose the internal APIs that we use to make tests work. You can leverage them to write you own tests.
