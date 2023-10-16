import { Delay } from "utils/functions";
import { PlayerStatus } from "interfaces/PlayerStatus";

// Define the initial player status
let playerStatus: PlayerStatus = {
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

setTick(async () => {
  await Delay(2500);
  if (hasPlayerStatusChanged()) {
    // emitNet("MUTINY:CORE:SERVER:PLAYER_STATUS_UPDATE", playerStatus);
    DisplayRadar(playerStatus.isInVehicle);

  }
});

const minimap = RequestScaleformMovie("minimap");
DisplayHud(false);

setTick(async () => {
  await Delay(100);
  if (minimap === 0) return;
  BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
  ScaleformMovieMethodAddParamInt(3);
  EndScaleformMovieMethod();
});

// Check if the player's status has changed
function hasPlayerStatusChanged(): boolean {
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

  // Use guard clauses to check if the player's status has changed
  if (newStatus.isDead !== playerStatus.isDead) {
    playerStatus.isDead = newStatus.isDead;
    return true;
  }

  if (newStatus.isShooting !== playerStatus.isShooting) {
    playerStatus.isShooting = newStatus.isShooting;
    return true;
  }

  if (newStatus.isAiming !== playerStatus.isAiming) {
    playerStatus.isAiming = newStatus.isAiming;
    return true;
  }

  if (newStatus.isSprinting !== playerStatus.isSprinting) {
    playerStatus.isSprinting = newStatus.isSprinting;
    return true;
  }

  if (newStatus.isJumping !== playerStatus.isJumping) {
    playerStatus.isJumping = newStatus.isJumping;
    return true;
  }

  if (newStatus.isClimbing !== playerStatus.isClimbing) {
    playerStatus.isClimbing = newStatus.isClimbing;
    return true;
  }

  if (newStatus.isFalling !== playerStatus.isFalling) {
    playerStatus.isFalling = newStatus.isFalling;
    return true;
  }

  if (newStatus.isParachuting !== playerStatus.isParachuting) {
    playerStatus.isParachuting = newStatus.isParachuting;
    return true;
  }

  if (newStatus.isRagdoll !== playerStatus.isRagdoll) {
    playerStatus.isRagdoll = newStatus.isRagdoll;
    return true;
  }

  if (newStatus.isGettingJacked !== playerStatus.isGettingJacked) {
    playerStatus.isGettingJacked = newStatus.isGettingJacked;
    return true;
  }

  if (newStatus.isGettingStunned !== playerStatus.isGettingStunned) {
    playerStatus.isGettingStunned = newStatus.isGettingStunned;
    return true;
  }

  if (newStatus.isDiving !== playerStatus.isDiving) {
    playerStatus.isDiving = newStatus.isDiving;
    return true;
  }

  if (newStatus.isReloading !== playerStatus.isReloading) {
    playerStatus.isReloading = newStatus.isReloading;
    return true;
  }

  if (newStatus.isSwimming !== playerStatus.isSwimming) {
    playerStatus.isSwimming = newStatus.isSwimming;
    return true;
  }

  if (newStatus.isDucking !== playerStatus.isDucking) {
    playerStatus.isDucking = newStatus.isDucking;
    return true;
  }

  if (newStatus.isJackingVehicle !== playerStatus.isJackingVehicle) {
    playerStatus.isJackingVehicle = newStatus.isJackingVehicle;
    return true;
  }

  if (newStatus.isAimingFromCover !== playerStatus.isAimingFromCover) {
    playerStatus.isAimingFromCover = newStatus.isAimingFromCover;
    return true;
  }

  if (newStatus.isVaulting !== playerStatus.isVaulting) {
    playerStatus.isVaulting = newStatus.isVaulting;
    return true;
  }

  if (newStatus.isWalking !== playerStatus.isWalking) {
    playerStatus.isWalking = newStatus.isWalking;
    return true;
  }

  if (newStatus.isInVehicle !== playerStatus.isInVehicle) {
    playerStatus.isInVehicle = newStatus.isInVehicle;
    return true;
  }

  // Return false if the player's status has not changed
  return false;
}
