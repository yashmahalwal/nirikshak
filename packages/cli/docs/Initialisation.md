# Initialisation

Before starting with Nirikshak, you need a certain folder structure. `init` command helps you set up your project. We call that initialising the project. Now we cover all the steps that are taken during initialisation.

## Step 1: Make a basic directory structure

We create a few directories to set up your tests. Following steps are taken:

1. Create `.nirikshak` directory
2. Create the test folder
3. Create and populate folders for each resource. This is same as the add resource command.
 <!-- TODO: Reference to add resource -->

**Note**: This step fails if `.nirikshak already exists`.

## Step 2: Place the jest configuration

We add a jest configuration to your project. Following files are added to your project:

1. `jest.config.json` : We expect this file to be present before running tests. **You are not to change the projects field manually**.

2. `jest.setup.js` : This is used to increase the jest timeout as a safe measure. We increase it from 5s to 30s. That is to make sure that the test does not timeout before your API can complete processing. You can change it to a value that suites you.

## Step 3: Adding entries to .nirikshak

We save your configuration state to `.nirikshak` folder. That helps us valdiate your project structure in the future. Following files are made

1. `dir` : Stores the dir key of the configuration.
2. `app` : Stores the app key of the configuration.
3. `[resourceName]` : Stores the directory for the resource from the configuration
