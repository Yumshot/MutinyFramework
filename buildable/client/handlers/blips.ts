import {
  BARBERSHOP_BLIPS,
  CLOTHING_STORE_BLIPS,
  GAS_BLIPS,
  MLO_BLIPS,
} from "../../common/blips";

const DEFAULT_BLIPS = [
  ...BARBERSHOP_BLIPS,
  ...CLOTHING_STORE_BLIPS,
  ...GAS_BLIPS,
  ...MLO_BLIPS,
];

const CreateDefaultBlips = () => {
  for (const blip of DEFAULT_BLIPS) {
    blip.handle = AddBlipForCoord(blip.x, blip.y, blip.z);
    SetBlipSprite(blip.handle, blip.blip);
    SetBlipDisplay(blip.handle, 4);
    SetBlipScale(blip.handle, blip.scale);
    SetBlipColour(blip.handle, blip.colour);
    SetBlipAsShortRange(blip.handle, true);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString(blip.name);
    EndTextCommandSetBlipName(blip.handle);
  }
};

CreateDefaultBlips();
