import { CreateNewCharacter } from "classes/BuildNewCharacter";
import { FindSteam } from "modules/utils/queries";
import { __databaseInstance } from "server";

onNet("CreateNewUserCharacter", async (data: any) => {
  const steam_target = FindSteam(source);
  const base_license = {
    id: 0,
    active: false,
    owned: false,
  };

  const newCharacter = new CreateNewCharacter(
    steam_target,
    data.first_name,
    data.last_name,
    data.sex,
    data.age,
    data.internet_handle,
    { x: 0, y: 0, z: 0, heading: 0 },
    {
      cash: 500,
      bank: new Array(),
      pin: data.pin,
      crypto: {
        yumSats: 0,
        jizzCoin: 0,
        transactions: new Array(),
      },
    },
    data.appearance,
    {
      weapon: {
        possession: base_license,
        hunting: base_license,
        sportShooting: base_license,
        dealers: base_license,
        classIII: base_license,
      },
      vehicle: {
        classD: base_license,
        classC: base_license,
        classA: base_license,
        classM: base_license,
      },
      pilot: {
        commercial: base_license,
        private: base_license,
        airTrafficController: base_license,
      },
      business: {
        business: new Array(),
        realEstate: base_license,
        stockBroker: base_license,
      },
    },
    "low-income",
    {
      warrants: new Array(),
      convictions: new Array(),
      arrests: new Array(),
      tickets: new Array(),
    },
    new Array(),
    new Array(),
    {
      needs: {
        health: 100,
        hunger: 100,
        thirst: 100,
        bloodLevel: 100,
        oxygenLevel: 100,
        stress: 0,
        adrenaline: 0,
        stamina: 100,
        armor: 0,
      },
      medicalStatus: "healthy",
      medicalHistory: new Array(),
      medicalBills: new Array(),
    }
  );
  const __character = await newCharacter.build();
  try {
    await __databaseInstance.InsertNewCharacterToUserCharacterData({
      steam_target: steam_target,
      composition: __character,
    });
  } catch (error) {
    console.log(error);
  }
});
