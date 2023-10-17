// Defining the `CharacterValues` interface.
export interface CharacterValues {
  _id: string;
  hex: string;
  name: string;
  steam: string;
  discord: string;
  priority: number;
  last_character: any;
  is_banned: boolean;
  first_join: boolean;
  characters: any[];
  ban_info: any[];
}


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