# Configuration file

Nirikshak needs a configuration file to run. It keeps track of your directory structure using that file. Nirikshak searches for `nirikshak.json` in the working directory by default. You can change the path to configuration file using `--config` option.

# Fields

Now we cover all the fields of the configuration. We discuss purpose of the field, validations and assumptions we make about it.

## 1. dir

The directory to use for testing. Nirikshak creates this directory during initialisation. This argument is a path **relative to the working directory**. Nirikshak configures jest to work with this directory.

## 2. app

The server implementation to use for testing. Nirikshak tunnels this app in the testing directory. In case you provide type definitions for your application, enter the path to the js file.

