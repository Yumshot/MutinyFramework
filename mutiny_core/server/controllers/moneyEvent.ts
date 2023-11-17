import { __databaseInstance } from "server";

onNet("removeFunds", async (src: number, payload: any) => {
  const db = __databaseInstance;
  const player = src;
  const steam = getPlayerIdentifiers(player)[0];
  const user = await db.GetUserData({ steam_target: steam });
  const currentCharacter = user.last_character;
  const targetCharacter = user.characters[currentCharacter];
  await db.RemoveCharacterFunds({
    target: targetCharacter,
    amount: payload.amount,
  });
  // console.log(payload);
  if (payload.eventType === "LSCustoms") {
    emit(`${payload.event}`, src, payload.purchase);
  }
});
