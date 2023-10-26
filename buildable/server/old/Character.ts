import { BankAccount } from "./Bank";
import { CashFunds } from "./Cash";
import { Job } from "./Job";

export interface DataParameterCreateUserCredentials {
  0: NewCharacter;
  1: User;
}

export interface User {
  name: string;
  hex?: string;
  ip: string;
  steam: string;
  discord: string;
  priority?: number;
  is_banned?: boolean;
  first_join?: boolean;
  permission_level?: number;
  characters?: [];
  last_character?: number;
  ban_info?: [];
}

export interface NewCharacter {
  index: number;
  birthdate: string;
  first_name: string;
  last_name: string;
  sex: string;
  last_location: LastLocation;
  job: Job[];
  funds: {
    cash: CashFunds;
    bank: BankAccount[];
  };
  model: Model;
}

export interface LastLocation {
  x: number;
  y: number;
  z: number;
  heading: number;
}

export interface Model {
  components: Component[];
  eyeColor: number;
  faceFeatures: FaceFeatures;
  hair: Hair;
  headBlend: HeadBlend;
  headOverlays: HeadOverlays;
  model: string;
  props: Prop[];
  tattoos: any;
}

export interface Component {
  component_id: number;
  drawable: number;
  texture: number;
}

export interface Prop {
  drawable: number;
  prop_id: number;
  texture: number;
}

export interface Hair {
  color: number;
  highlight: number;
  style: number;
}

export interface HeadBlend {
  shapeFirst: number;
  shapeMix: number;
  shapeSecond: number;
  skinFirst: number;
  skinMix: number;
  skinSecond: number;
}
export interface Feature {
  color: number;
  opacity: number;
  style: number;
}

export interface HeadOverlays {
  ageing: Feature;
  beard: Feature;
  blemishes: Feature;
  blush: Feature;
  bodyBlemishes: Feature;
  chestHair: Feature;
  complexion: Feature;
  eyebrows: Feature;
  lipstick: Feature;
  makeUp: Feature;
  moleAndFreckles: Feature;
  sunDamage: Feature;
}

export interface FaceFeatures {
  cheeksBoneHigh: number;
  cheeksBoneWidth: number;
  cheeksWidth: number;
  chinBoneLenght: number;
  chinBoneLowering: number;
  chinBoneSize: number;
  chinHole: number;
  eyeBrownForward: number;
  eyeBrownHigh: number;
  eyesOpening: number;
  jawBoneBackSize: number;
  jawBoneWidth: number;
  lipsThickness: number;
  neckThickness: number;
  noseBoneHigh: number;
  noseBoneTwist: number;
  nosePeakHigh: number;
  nosePeakLowering: number;
  nosePeakSize: number;
  noseWidth: number;
}
