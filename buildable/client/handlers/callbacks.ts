// Importing a Delay function from a module called "utils/functions"
import { CAM_FOR_CHARACTER_SELECT } from "character/spawn";
import { Delay } from "utils/functions";

// Creating a variable called "exp" that references the global "exports" object
const exp = (global as any).exports;

// An array of base models for characters
const baseModels = ["mp_m_freemode_01", "mp_f_freemode_01"];

// An asynchronous function that creates the first character for a player
const createFirstCharacter = async (context: any, idents: any) => {
  // Emitting a network event to create the first character with the given context and identifiers
  emitNet("MUTINY:CORE:SERVER:CHARACTER:CREATE:CREATE_FIRST_CHARACTER", [
    context,
    idents,
  ]);
  // Calling a function to close the NUI (Native UI) completely
  CLOSE_NUI_COMPLETELY();
};

/**
 * An asynchronous function that registers a character with the specified appearance data.
 * @param data The appearance data for the character.
 */
const registerCharacter = async (data: any) => {
  DisplayHud(false);
  DisplayRadar(false);
  // Setting the NUI focus to false
  SetNuiFocus(false, false);
  // Getting the ID of the player's character
  const ped = PlayerPedId();
  // Unfreezing the player's character
  FreezeEntityPosition(ped, false);
  // Getting the sex of the character from the appearance data
  const { sex } = data[0];
  // Determining the index of the character's model in the baseModels array based on their sex
  const modelIndex = sex === "Male" ? 0 : 1;
  // Getting the model name from the baseModels array using the modelIndex
  const model = baseModels[modelIndex];
  // Waiting for 500 milliseconds
  await Delay(500);
  // Requesting the model to be loaded
  RequestModel(model);
  // Waiting until the model is loaded
  while (!HasModelLoaded(model)) {
    await Delay(500);
  }
  // Setting the player's model to the loaded model using the "mutiny_appearance" export
  exp["mutiny_appearance"].setPlayerModel(model);
  // Creating a configuration object for the player's customization
  const config = {
    ped: false,
    headBlend: true,
    faceFeatures: true,
    headOverlays: true,
    components: true,
    props: true,
    allowExit: false,
    tattoos: false,
  };
  // Starting the player's customization using the "mutiny_appearance" export
  exp["mutiny_appearance"].startPlayerCustomization((appearance: any) => {
    // Emitting a network event to save the character's outfit with the given appearance data
    if (appearance) {
      emitNet(
        "MUTINY:CORE:SERVER:CHARACTER:SAVE:SAVE_CHARACTER_OUTFIT",
        0,
        appearance
      );
    }
  }, config);
};

// An asynchronous function that selects a character with the given context
const selectCharacter = async (context: any) => {
  // Logging a message to the console
  console.log(`${context.model} : NUI CALLBACK`);
  // Emitting a network event to select the character with the given context
  emitNet("MUTINY:CORE:SERVER:CHARACTER:SELECTED:SELECTED_CHARACTER", context);
};

// An asynchronous function that loads a character with the given context
const loadCharacter = async (context: any) => {
  // Destructuring the model and last_location properties from the context object
  const { model, last_location } = context;
  // Requesting the model to be loaded
  RequestModel(model.model);
  // Waiting until the model is loaded
  while (!HasModelLoaded(model.model)) {
    await Delay(500);
  }

  // Setting the auto-spawn callback for the "spawnmanager" export
  exp.spawnmanager.setAutoSpawnCallback(() => {
    // Spawning the player with the given model and last location using the "spawnmanager" export
    exp.spawnmanager.spawnPlayer(
      {
        x: last_location.x,
        y: last_location.y,
        z: last_location.z,
        skipFade: true,
        model: model.model,
      },
      async () => {
        DoScreenFadeOut(10000);
        exp["mutiny_appearance"].setPlayerAppearance(model);
        CLOSE_NUI_COMPLETELY();
        await Delay(10000);
        // Getting the ID of the player's character
        const ped = PlayerPedId();
        SetEntityVisible(ped, true, false);
        // Setting the heading of the player's character to the last location's heading
        SetEntityHeading(ped, last_location.heading);
        RenderScriptCams(false, false, 0, true, true);
        SetCamActive(CAM_FOR_CHARACTER_SELECT, false);
        DestroyCam(CAM_FOR_CHARACTER_SELECT, true);
        DoScreenFadeIn(10000);
        await Delay(10000);
        FreezeEntityPosition(ped, false);
        // Calling a function to close the NUI completely
      }
    );
  });
  // Setting auto-spawn to true for the "spawnmanager" export
  exp.spawnmanager.setAutoSpawn(true);
  // Forcing a respawn using the "spawnmanager" export
  exp.spawnmanager.forceRespawn();
};

// A function that closes the NUI completely
const CLOSE_NUI_COMPLETELY = () => {
  SendNUIMessage({
    event: "RESET",
  });
  SetNuiFocus(false, false);
};

// Registering a NUI callback for creating user credentials
RegisterNuiCallback("create_user_credentials", async (data: any, cb: any) => {
  // Destructuring the context and identifiers properties from the data object
  const { data: context, identifiers: idents } = data;
  // If either context or identifiers are missing, return an error callback
  if (!context || !idents) {
    return cb("error");
  }
  // Calling the createFirstCharacter function with the given context and identifiers
  await createFirstCharacter(context, idents);
  // Returning an OK callback
  cb("ok");
});

// Listening for a network event for when a character is registered
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:CALLBACKS:REGISTERED_CHARACTER",
  async (data: any) => {
    // If no data is provided, return
    if (!data) {
      return;
    }
    // Calling the registerCharacter function with the given data
    await registerCharacter(data);
  }
);

// Registering a NUI callback for selecting a character
RegisterNuiCallback("selected_character", async (data: any, cb: any) => {
  // Destructuring the context property from the data object
  const { data: context } = data;
  // If context is missing, return an error callback
  if (!context) {
    return cb("error");
  }
  // Calling the selectCharacter function with the given context
  await selectCharacter(context);
  // Returning an OK callback
  cb("ok");
});

// Listening for a network event for loading a character
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:CALLBACKS:LOAD_CHARACTER",
  async (context: any) => {
    // If context, model, or last_location are missing, return
    if (!context || !context.model || !context.last_location) {
      return;
    }
    // Calling the loadCharacter function with the given context
    await loadCharacter(context);
  }
);
