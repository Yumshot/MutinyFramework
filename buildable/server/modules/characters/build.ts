import { CreateNewCharacter } from "classes/BuildNewCharacter";
import { FindSteam } from "modules/utils/querys";
import { __databaseInstance } from "server";

onNet("CreateNewUserCharacter", async (data: any) => {
  const steam_target = FindSteam(source);
  const character = new CreateNewCharacter(
    steam_target, // get index from DB
    data.first_name,
    data.last_name,
    data.sex,
    data.age,
    data.internet_handle,
    { x: 0, y: 0, z: 0, heading: 0 },
    { cash: 0, bank: [], pin: data.pin }
  );
  const __character = await character.build();
  console.log(__character);
  try {
    await __databaseInstance.InsertNewCharacterToUserCharacterData({
      steam_target: steam_target,
      composition: __character,
    });
  } catch (error) {
    console.log(error);
  }
});
