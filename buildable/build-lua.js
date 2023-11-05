const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const mutinyFrameworkDirClient = join(
  __dirname,
  "..",
  "..",
  "mutiny-framework/buildable/client/c_defaults.lua"
);

const mutinyFrameworkDirServer = join(
  __dirname,
  "..",
  "..",
  "mutiny-framework/buildable/server/s_defaults.lua"
);

const mutinyServerDirClient = join(
  __dirname,
  "..",
  "..",
  "mutiny-server/resources/mutiny_core/c_defaults.lua"
);
const mutinyServerDirServer = join(
  __dirname,
  "..",
  "..",
  "mutiny-server/resources/mutiny_core/s_defaults.lua"
);

// Log the directories
console.log(
  `Mutiny Framework directory: ${mutinyFrameworkDirClient} ${mutinyFrameworkDirServer}`
);
console.log(
  `Mutiny Server directory: ${mutinyServerDirClient} ${mutinyServerDirServer}`
);
try {
  // Check if the file exists in mutinyServerDir
  if (!readFileSync(mutinyServerDirClient)) {
    // create the file
    writeFileSync(mutinyServerDirClient, "");
  } else {
    console.log("Mutiny Server directory found.");
  }

  // Check if the file exists in mutinyServerDir
  if (!readFileSync(mutinyServerDirServer)) {
    // create the file
    writeFileSync(mutinyServerDirServer, "");
  } else {
    console.log("Mutiny Server directory found.");
  }

  // Check if the file exists in mutinyFrameworkDir
  if (
    !readFileSync(mutinyFrameworkDirClient) ||
    !readFileSync(mutinyFrameworkDirServer)
  ) {
    console.log("Mutiny Framework directory not found.");
    process.exit(1);
  } else {
    console.log("Mutiny Framework directory found.");
  }

  // Read the file
  const mutinyFrameworkFile = readFileSync(mutinyFrameworkDirClient, "utf8");
  const mutinyFrameworkFileServer = readFileSync(
    mutinyFrameworkDirServer,
    "utf8"
  );

  // Take contents of Framework File, and replace the contents of the Server File with it
  writeFileSync(mutinyServerDirClient, mutinyFrameworkFile);
  writeFileSync(mutinyServerDirServer, mutinyFrameworkFileServer);
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
