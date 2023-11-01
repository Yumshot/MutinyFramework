const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const mutinyFrameworkDir = join(
  __dirname,
  "..",
  "..",
  "mutiny-framework/buildable/client/defaults.lua"
);
const mutinyServerDir = join(
  __dirname,
  "..",
  "..",
  "mutiny-server/resources/mutiny_core/defaults.lua"
);

// Log the directories
console.log(`Mutiny Framework directory: ${mutinyFrameworkDir}`);
console.log(`Mutiny Server directory: ${mutinyServerDir}`);
try {
  // Check if the file exists in mutinyServerDir
  if (!readFileSync(mutinyServerDir)) {
    // create the file
    writeFileSync(mutinyServerDir, "");
  } else {
    console.log("Mutiny Server directory found.");
  }

  // Check if the file exists in mutinyFrameworkDir
  if (!readFileSync(mutinyFrameworkDir)) {
    console.log("Mutiny Framework directory not found.");
    process.exit(1);
  } else {
    console.log("Mutiny Framework directory found.");
  }

  // Read the file
  const mutinyFrameworkFile = readFileSync(mutinyFrameworkDir, "utf8");

  // Take contents of Framework File, and replace the contents of the Server File with it
  writeFileSync(mutinyServerDir, mutinyFrameworkFile);

  // Log we're done
  console.log("Done.");
} catch (error) {
  // Log the error
  console.error(error);

  // Exit with code 1
  process.exit(1);
}

// const fs = require("fs");
// const path = require("path");

// const context = process.argv[2]; // get the context from command line argument
// const defaultsFileName = "defaults.lua";
// const mutinyFrameworkDir = path.join(
//   __dirname,
//   "..",
//   "..",
//   "mutiny-framework",
//   "buildable",
//   context,
//   defaultsFileName
// );
// const mutinyServerDir = path.join(
//   __dirname,
//   "..",
//   "..",
//   "mutiny-server",
//   "resources",
//   "mutiny_core",
//   context,
//   defaultsFileName
// );

// // Log the directories
// console.log(`Mutiny Framework directory: ${mutinyFrameworkDir}`);
// console.log(`Mutiny Server directory: ${mutinyServerDir}`);

// try {
//   // Check if the file exists in mutinyServerDir
//   if (!fs.existsSync(mutinyServerDir)) {
//     // create the file
//     fs.writeFileSync(mutinyServerDir, "");
//   } else {
//     console.log("Mutiny Server directory found.");
//   }

//   // Check if the file exists in mutinyFrameworkDir
//   if (!fs.existsSync(mutinyFrameworkDir)) {
//     console.log("Mutiny Framework directory not found.");
//     process.exit(1);
//   } else {
//     console.log("Mutiny Framework directory found.");
//   }

//   // Read the file
//   const mutinyFrameworkFile = fs.readFileSync(mutinyFrameworkDir, "utf8");

//   // Take contents of Framework File, and replace the contents of the Server File with it
//   fs.writeFileSync(mutinyServerDir, mutinyFrameworkFile);

//   // Log we're done
//   console.log("Done.");
// } catch (error) {
//   // Log the error
//   console.error(error);

//   // Exit with code 1
//   process.exit(1);
// }
