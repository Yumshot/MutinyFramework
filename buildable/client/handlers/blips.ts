import { Delay } from "utils/functions";
import {
  BARBERSHOP_BLIPS,
  CLOTHING_STORE_BLIPS,
  GAS_BLIPS,
} from "../../common/blips";
import { IBlip } from "interfaces/Blip";

const DEFAULT_BLIPS = [
  ...BARBERSHOP_BLIPS,
  ...CLOTHING_STORE_BLIPS,
  ...GAS_BLIPS,
];

const MAX_BLIP_DISTANCE = 75; // Change this to the maximum distance

// Create blips for all of the default blip locations.
export const CreateBlips = async (): Promise<void> => {
  for (let index = 0; index < DEFAULT_BLIPS.length; index++) {
    const element = DEFAULT_BLIPS[index];
    if (!element.hidden && !element.hasOwnProperty("id")) {
      const blip = AddBlipForCoord(element.x, element.y, element.z);
      SetBlipSprite(blip, element.blip);
      SetBlipDisplay(blip, 4);
      SetBlipScale(blip, element.scale);
      SetBlipColour(blip, element.colour);
      SetBlipAsShortRange(blip, true);
      BeginTextCommandSetBlipName("STRING");
      AddTextComponentString(element.name);
      EndTextCommandSetBlipName(blip);
    } else {
      console.log("Blip is hidden or already has an ID.");
    }
  }
};

CreateBlips();
