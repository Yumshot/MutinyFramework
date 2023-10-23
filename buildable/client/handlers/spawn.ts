import { CAM_FOR_CHARACTER_SELECT } from "character/spawn";
import { Delay } from "utils/functions";
import { PLAYER_STATUS } from "./character";
import { CloseNuiCompletely } from "./nui";

const exp = (global as any).exports;
export const HandleSpawn = async (context?: any) => {
  if (!PLAYER_STATUS.hasSpawned) {
    exp.spawnmanager.setAutoSpawnCallback(() => {
      exp.spawnmanager.spawnPlayer(
        {
          x: context.last_location.x,
          y: context.last_location.y,
          z: context.last_location.z,
          skipFade: true,
          model: context.model.model,
        },
        async () => {
          DoScreenFadeOut(5000);
          exp["mutiny_appearance"].setPlayerAppearance(context.model);
          CloseNuiCompletely();
          await Delay(10000);
          const ped = PlayerPedId();
          SetEntityVisible(ped, true, false);
          SetEntityHeading(ped, context.last_location.heading);
          RenderScriptCams(false, false, 0, true, true);
          SetCamActive(CAM_FOR_CHARACTER_SELECT, false);
          DestroyCam(CAM_FOR_CHARACTER_SELECT, true);
          DoScreenFadeIn(10000);
          await Delay(10000);
          FreezeEntityPosition(ped, false);
        }
      );
    });
    exp.spawnmanager.setAutoSpawn(true);
    exp.spawnmanager.forceRespawn();
    PLAYER_STATUS.hasSpawned = true;
  } else {
    //!TODO : HANDLE SPAWN AFTER DEATH
    console.log("MUTINY>CORE>CLIENT>CHARACTER>SPAWN>SPAWNED");
  }
};
