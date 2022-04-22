#!/usr/bin/env node

const lib = require("../dist/index.js");

// const yargs = require("yargs");
// const usage = "\nUsage: tran <lang_name> sentence to be translated";
// const options = yargs
//   .usage(usage)
//   .option("build", {
//     describe: "Build your express app.",
//     type: "boolean",
//     demandOption: false,
//   })
//   .option("watch", {
//     describe: "Develop your express app.",
//     type: "boolean",
//     demandOption: false
//   })
//   .help(true)
//   .argv;

lib.compile();