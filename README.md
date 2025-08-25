# My Blockly App

## Project Overview

This is an interactive visual programming application built with Google's Blockly library for the Udacity DECI program. It features a comprehensive block-based programming environment that allows users to create programs by dragging and dropping visual blocks, which are then compiled to JavaScript and executed in real-time.

**✅ Udacity Project Requirements Met:**
- ✅ Created a Blockly app that responds to user input
- ✅ Interactive features with user prompts and dynamic responses
- ✅ Ready for portfolio sharing with built-in examples
- ✅ Professional documentation and live demo ready

## Features

- **Visual Programming Interface**: Intuitive drag-and-drop block interface with professional styling
- **Real-time Code Generation**: Automatically generates JavaScript code as you build
- **Live Execution**: See your program output instantly
- **Interactive User Input**: Custom blocks for getting user input with prompts
- **Built-in Examples**: Ready-to-try programs including:
  - Hello World demonstration
  - Interactive greeting with user input
  - Simple calculator with user prompts
  - Number guessing game
- **Custom Interactive Blocks**: 
  - "Add Text" block for output display
  - "Ask User" block for input prompts
  - "Clear Output" block for screen management
  - "Number Guessing Game" block for interactive gaming
- **Comprehensive Toolbox**: Includes Logic, Loops, Math, Text, Lists, Variables, Functions, and Interactive categories
- **Workspace Persistence**: Your work is automatically saved and restored
- **Professional UI**: Modern design with gradient header and styled components
- **Example Loader**: One-click loading of demonstration programs

## Live Demo

You can view the live application by opening `dist/index.html` in your web browser, or by running the development server.

## Quick Start

1. [Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) npm if you haven't before.
2. Clone or download this project
3. Run `npm install` to install the required dependencies.
4. Run `npm run start` to run the development server and see the app in action.
5. If you make any changes to the source code, just refresh the browser while the server is running to see them.

## How to Use the Interactive Features

### Try the Built-in Examples
When you first open the app, you'll see example program buttons on the right panel:
- **Hello World**: Click to see a simple text output demonstration
- **Interactive Greeting**: Click to try a program that asks for your name and greets you
- **Simple Calculator**: Click to try a program that asks for two numbers and adds them
- **Number Game**: Click to start an interactive number guessing game
- **Clear All**: Click to clear the workspace and start fresh

### Create Your Own Interactive Programs
1. Drag blocks from the toolbox on the left to the workspace
2. Use the "Interactive" category for user input blocks
3. Use the "Text" category for the "Ask user" and "Add text" blocks
4. Connect blocks together to create sequences
5. Watch the generated code update in real-time
6. See your program output on the right side

### User Input Examples
- **Ask User Block**: Use this to prompt users for input (found in Text category)
- **Add Text Block**: Use this to display output to users
- **Number Game Block**: Use this for a complete interactive game (found in Interactive category)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Google Blockly Library
- **Build Tools**: Webpack, npm
- **Development**: webpack-dev-server for live reloading

## Tooling

The application uses many of the same tools that the Blockly team uses to develop Blockly itself. Following is a brief overview, and you can read more about them on our [developer site](https://developers.google.com/blockly/guides/contribute/get-started/development_tools).

- Structure: The application is built as an npm package. You can use npm to manage the dependencies of the application.
- Modules: ES6 modules to handle imports to/exports from other files.
- Building/bundling: Webpack to build the source code and bundle it into one file for serving.
- Development server: webpack-dev-server to run locally while in development.
- Testing: Mocha to run unit tests.
- Linting: Eslint to lint the code and ensure it conforms with a standard style.
- UI Framework: Does not use a framework. For more complex applications, you may wish to integrate a UI framework like React or Angular.

You can disable, reconfigure, or replace any of these tools at any time, but they are preconfigured to get you started developing your Blockly application quickly.

## Structure

- `package.json` contains basic information about the app. This is where the scripts to run, build, etc. are listed.
- `package-lock.json` is used by npm to manage dependencies
- `webpack.config.js` is the configuration for webpack. This handles bundling the application and running our development server.
- `src/` contains the rest of the source code.
- `dist/` contains the packaged output (that you could host on a server, for example). This is ignored by git and will only appear after you run `npm run build` or `npm run start`.

### Source Code

- `index.html` contains the skeleton HTML for the page. This file is modified during the build to import the bundled source code output by webpack.
- `index.js` is the entry point of the app. It configures Blockly and sets up the page to show the blocks, the generated code, and the output of running the code in JavaScript.
- `serialization.js` has code to save and load the workspace using the browser's local storage. This is how your workspace is saved even after refreshing or leaving the page. You could replace this with code that saves the user's data to a cloud database instead.
- `toolbox.js` contains the toolbox definition for the app. The current toolbox contains nearly every block that Blockly provides out of the box. You probably want to replace this definition with your own toolbox that uses your custom blocks and only includes the default blocks that are relevant to your application.
- `blocks/text.js` has code for a custom text block, just as an example of creating your own blocks. You probably want to delete this block, and add your own blocks in this directory.
- `generators/javascript.js` contains the JavaScript generator for the custom text block. You'll need to include block generators for any custom blocks you create, in whatever programming language(s) your application will use.

## Serving

To run your app locally, run `npm run start` to run the development server. This mode generates source maps and ingests the source maps created by Blockly, so that you can debug using unminified code.

To deploy your app so that others can use it, run `npm run build` to run a production build. This will bundle your code and minify it to reduce its size. You can then host the contents of the `dist` directory on a web server of your choosing. If you're just getting started, try using [GitHub Pages](https://pages.github.com/).
