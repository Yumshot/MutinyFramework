import { PlayerStatus } from "interfaces/Character";
import { Delay, HasSpawned, MakeModelRequest } from "utils/functions";
import { CloseNuiCompletely } from "./nui";
import { CAM_FOR_CHARACTER_SELECT } from "character/spawn";
import { HandleSpawn } from "./spawn";

export let PLAYER_STATUS: PlayerStatus = {
  hasSpawned: false,
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
  emitNet("MUTINY:CORE:SERVER:CHARACTER:SELECTED:SELECTED_CHARACTER", context);
};

export const LoadCharacter = async (context: any) => {
  await MakeModelRequest(context.model, 100);
  await HandleSpawn(context);
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
    hasSpawned: HasSpawned(),
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
