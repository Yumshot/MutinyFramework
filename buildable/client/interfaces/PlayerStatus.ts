// Define the player status interface
export interface PlayerStatus {
  isInVehicle: boolean;
  isDead: boolean;
  isShooting: boolean;
  isAiming: boolean;
  isSprinting: boolean;
  isJumping: boolean;
  isClimbing: boolean;
  isFalling: boolean;
  isParachuting: boolean;
  isRagdoll: boolean;
  isGettingJacked: boolean;
  isGettingStunned: boolean;
  isDiving: boolean;
  isReloading: boolean;
  isSwimming: boolean;
  isDucking: boolean;
  isJackingVehicle: boolean;
  isAimingFromCover: boolean;
  isVaulting: boolean;
  isWalking: boolean;
}
