import { SendCharacterCreate } from "modules/nui/createCharacter";

RegisterCommand(
  "test",
  async (source: any, args: any, raw: any) => {
    console.log(global.exports["cfx-anes-worldsync"].getTime());
  },
  false
);
