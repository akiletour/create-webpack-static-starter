#! /usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const pkg = require("./package.json");
const lib = require(".");

const messages = lib.messages;
const createWebpackStaticApp = lib.createWebpackStaticApp;

let projectName;

program
  .version(pkg.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(function(name) {
    projectName = name;
  })
  .allowUnknownOption()
  .on("--help", messages.help)
  .parse(process.argv);

createWebpackStaticApp({
  projectName
});
