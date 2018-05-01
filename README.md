# Exploring UI Composition in Aurelia

A demo application showing various kinds of UI composition in Aurelia.

### Notes about this version

This sample has been modified from the original TypeScript to only ECMAScript 2015. This required several changes to some places in the code since **FrontEnd Creator** uses RequireJS as its loader. If you compare the original sample Rob provides on GitHub with this example, you should see that there is very little that has been changed. 

We also want to thank **Rob Eisenberg** for letting us makes this a sample application to get from the Market Place. Check out his presentation [Exploring UI Composition in Aurelia](https://www.infoq.com/presentations/aurelia-ui-composition).

### Navigating the application

To navigate in the application use *PageDown* or *F9* for going to the next page as well as *PageUp* or *F7* for going to the previous page.

## Machine Setup

This app is built on the Aurelia CLI, which has a couple of prerequisites you must install first. If you have previously setup your machine for the Aurelia CLI, you can skip this step.

* Install NodeJS >= 4.x
    * You can [download it here](https://nodejs.org/en/).
* Install NPM 3.x
    * Even though you may have the latest NodeJS, that doesn't mean you have the latest version of NPM. You can check your version with `npm -v`. If you need to update, run `npm install npm -g`.
* Install a Git Client
    * Here's [a nice GUI client](https://desktop.github.com).
    * Here's [a standard client](https://git-scm.com).

Once you have the prerequisites installed, you can install the Aurelia CLI itself. From the command line, use npm to install the CLI globally:

```
npm install aurelia-cli -g
```

> Note: Always run commands from a Bash prompt. Depending on your environment, you may need to use `sudo` when executing npm global installs.

## Application Setup

Once you've setup your machine (or if it's been previous setup), you simply need to install the dependencies. From within the project folder, execute the following command:

```
npm install
```

## Running The App

To run the app, execute the following command from within the project folder:

```
au run
```

See [the CLI documentation](https://github.com/aurelia/cli) for other available commands or type `au help` on the command line.

See [the Video on InfoQ](https://www.infoq.com/presentations/aurelia-ui-composition?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=JavaScript)