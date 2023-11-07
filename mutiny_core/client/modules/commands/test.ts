import { SendCharacterSelect } from "modules/nui/characterSelect";

RegisterCommand(
  "testc",
  async (source: any, args: any, raw: any) => {
    console.log("triggered");
    const objects = GetGamePool("CObject");
    const target = -500221685;
    //find all objects with the model
    const foundObjects = objects.filter((object: any) => {
      console.log(object);
      return object === target;
    });
    console.log(foundObjects);
    //find location for each object
    const locations = foundObjects.map((object: any) => {
      return object.position;
    });

    // add blip for each location
    locations.forEach((location: any) => {
      const blip = AddBlipForCoord(location.x, location.y, location.z);
      SetBlipSprite(blip, 1);
      SetBlipColour(blip, 1);
      SetBlipAsShortRange(blip, true);
      BeginTextCommandSetBlipName("STRING");
      AddTextComponentString("Test");
      EndTextCommandSetBlipName(blip);
    });
  },
  false
);
