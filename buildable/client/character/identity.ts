import { Delay } from "utils/functions";

let characterIdentity: any = null;

onNet("MUTINY:CORE:CLIENT:CHARACTER:IDENTITY", async (reference: any) => {
  characterIdentity = reference;
});

RegisterCommand(
  "id",
  async (source: any, args: string | any[], raw: any) => {
    console.log(
      "MUTINY>CORE>CLIENT>CHARACTER>IDENTITY>COMMAND (source) ",
      source
    );
    emitNet(
      "MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_DATA_FOR_CLIENT",
      "MUTINY:CORE:CLIENT:CHARACTER:IDENTITY"
    );

    await Delay(1000);
    /**
     * Retrieves the target character from the characterIdentity object based on the last_character property.
     * @returns The target character object.
     */
    const target =
      characterIdentity.characters[characterIdentity.last_character];

    console.log(
      "MUTINY>CORE>CLIENT>CHARACTER>IDENTITY>COMMAND (message) ",
      target.first_name,
      target.last_name,
      target.index
    );
  },
  false
);
