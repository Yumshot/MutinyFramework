// Importing a Delay function from a module called "utils/functions"
import { CAM_FOR_CHARACTER_SELECT } from "character/spawn";
import { Delay } from "utils/functions";
import { BASE_MODELS, CHARACTER_CREATE_APPEARANCE_CONFIG } from "../../common/globals";
import { CloseNuiCompletely } from "./nui";
import { LoadCharacter, SelectCharacter } from "./character";

// Creating a variable called "exp" that references the global "exports" object
const exp = (global as any).exports;



// An asynchronous function that creates the first character for a player
const createFirstCharacter = async (context: any, idents: any) => {
  // Emitting a network event to create the first character with the given context and identifiers
  emitNet("MUTINY:CORE:SERVER:CHARACTER:CREATE:CREATE_FIRST_CHARACTER", [
    context,
    idents,
  ]);
  // Calling a function to close the NUI (Native UI) completely
  CloseNuiCompletely();
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
  const model = BASE_MODELS[modelIndex];
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
  }, CHARACTER_CREATE_APPEARANCE_CONFIG);
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
  await SelectCharacter(context);
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
    await LoadCharacter(context);
  }
);
