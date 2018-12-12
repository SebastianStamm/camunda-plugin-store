# Plugin Store for Camunda BPM

The Camunda Plugin Store is available as a plugin for Camunda Cockpit. After installing the Store plugin, you can easily manage your plugins from Cockpit without having to manually install them. Check out [The Last Plugin](https://github.com/SebastianStamm/the-last-plugin) and follow the installation instructions in order to use the Plugin Store in Cockpit

## Adding a plugin to the store

Thanks for your interest in contributing! In order to add your plugin to the store, please create a pull request. The pull request should contain a directory with a name that accurately describes your plugin (e.g. "translations" or "nightmode"). Inside the directory, you should have the following files and directories:

- `setup.json`: A JSON file containing information about how to install and uninstall your plugin (see below for details)
- `screenshot.png`: A representative screenshot that will be displayed in the store. The screenshot should have a height of 218px.
- `src/`: The contents of this directory will be copied to the server. It must contain an index.js file that serves as entry point for the plugin.

### The `setup.json` file

This file contains information about how to install and uninstall your plugin. Please have a look at this example to see how this file should be structured:

```json
{
  "title": "My Awesome Plugin",
  "description": "A short description of the Plugin. It should not contain more than 250 characters",
  "app": "Cockpit",
  "type": "Custom Script",
  "config": {
    "ngDeps": ["cockpit.awesomePlugin"]
  }
}
```

The `app` property indicates which webapp is augmented by the plugin. Right now, we only support `"Cockpit"` for this property.

The `type` property indicates what type of plugin this is. Right now, we only support `"Custom Script"` for this property.

The contents of the `config` property depend on the selected type. For the `"Custom Script"` type, the following two fields are required:

- `ngDeps`: An array of angular module ids that will be added to the `customScripts.ngDeps` array in the webapp config file
