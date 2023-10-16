import { Delay } from "utils/functions";

let characterIdentity: any = null;

onNet("MUTINY:CORE:CLIENT:CHARACTER:IDENTITY", async (reference: any) => {
    // console.log("MUTINY>CORE>CLIENT>CHARACTER>IDENTITY (reference) ", reference);
    characterIdentity = reference;
})

RegisterCommand(
  "id",
  async (source: any, args: string | any[], raw: any) => {
    console.log("MUTINY>CORE>CLIENT>CHARACTER>IDENTITY>COMMAND (source) ", source);
    emitNet(
      "MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_DATA_FOR_CLIENT",
      "MUTINY:CORE:CLIENT:CHARACTER:IDENTITY"
    );
    await Delay(1000);
    const message = `${characterIdentity}[characters[0]]${args[0]}`
    console.log("MUTINY>CORE>CLIENT>CHARACTER>IDENTITY>COMMAND (message) ", characterIdentity.characters[0]);
      emit("chat:addMessage", {
        args: [characterIdentity.characters[0]],
      });
  },
  false
);