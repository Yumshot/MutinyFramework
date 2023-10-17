import { PlayerStatus } from "interfaces/Character";
import { Delay, MakeModelRequest } from "utils/functions";
import { CloseNuiCompletely } from "./nui";
import { CAM_FOR_CHARACTER_SELECT } from "character/spawn";

const exp = (global as any).exports;

export let PLAYER_STATUS: PlayerStatus = {
    isDead: false,
    isShooting: false,
    isAiming: false,
    isSprinting: false,
    isJumping: false,
    isClimbing: false,
    isFalling: false,
    isParachuting: false,
    isRagdoll: false,
    isGettingJacked: false,
    isGettingStunned: false,
    isDiving: false,
    isReloading: false,
    isSwimming: false,
    isDucking: false,
    isJackingVehicle: false,
    isAimingFromCover: false,
    isVaulting: false,
    isWalking: false,
    isInVehicle: false,
};

export const SelectCharacter = async (context: any) => {
  DisplayRadar(false);
  //!NOTE - onNet("MUTINY:CORE:SERVER:CHARACTER:SELECTED:SELECTED_CHARACTER")
  emitNet("MUTINY:CORE:SERVER:CHARACTER:SELECTED:SELECTED_CHARACTER", context);
};


export const LoadCharacter = async (context: any) => {
  const { model, last_location } = context;
  MakeModelRequest(model, 100);

  // Setting the auto-spawn callback for the "spawnmanager" export
  exp.spawnmanager.setAutoSpawnCallback(() => {
    // Spawning the player with the given model and last location using the "spawnmanager" export
    exp.spawnmanager.spawnPlayer(
      {
        x: last_location.x,
        y: last_location.y,
        z: last_location.z,
        skipFade: true,
        model: model.model,
      },
      async () => {
        DoScreenFadeOut(10000);
        exp["mutiny_appearance"].setPlayerAppearance(model);
        CloseNuiCompletely();
        await Delay(10000);
        // Getting the ID of the player's character
        const ped = PlayerPedId();
        SetEntityVisible(ped, true, false);
        // Setting the heading of the player's character to the last location's heading
        SetEntityHeading(ped, last_location.heading);
        RenderScriptCams(false, false, 0, true, true);
        SetCamActive(CAM_FOR_CHARACTER_SELECT, false);
        DestroyCam(CAM_FOR_CHARACTER_SELECT, true);
        DoScreenFadeIn(10000);
        await Delay(10000);
        FreezeEntityPosition(ped, false);
        // Calling a function to close the NUI completely
      }
    );
  });
  // Setting auto-spawn to true for the "spawnmanager" export
  exp.spawnmanager.setAutoSpawn(false);
  // Forcing a respawn using the "spawnmanager" export
  exp.spawnmanager.forceRespawn();
};


export const HasPlayerStatusChanged = (): boolean => {
    const ped = PlayerPedId();
    const newStatus: PlayerStatus = {
        isDead: IsPedDeadOrDying(ped, true),
        isShooting: IsPedShooting(ped),
        isAiming: IsPlayerFreeAiming(PlayerId()),
        isSprinting: IsPedSprinting(ped),
        isJumping: IsPedJumping(ped),
        isClimbing: IsPedClimbing(ped),
        isFalling: IsPedFalling(ped),
        isParachuting: IsPedInParachuteFreeFall(ped),
        isRagdoll: IsPedRagdoll(ped),
        isGettingJacked: IsPedBeingJacked(ped),
        isGettingStunned: IsPedGettingIntoAVehicle(ped),
        isDiving: IsPedDiving(ped),
        isReloading: IsPedReloading(ped),
        isSwimming: IsPedSwimming(ped),
        isDucking: IsPedDucking(ped),
        isJackingVehicle: IsPedJacking(ped),
        isAimingFromCover: IsPedAimingFromCover(ped),
        isVaulting: IsPedVaulting(ped),
        isWalking: IsPedWalking(ped),
        isInVehicle: IsPedInAnyVehicle(ped, true),
    };

    const statusChanged = Object.entries(newStatus).some(([key, value]) => {
        if (value !== PLAYER_STATUS[key as keyof PlayerStatus]) {
          PLAYER_STATUS[key as keyof PlayerStatus] = value;
          return true;
        }
        return false;
    });

    return statusChanged;
};
