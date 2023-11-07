export interface ICharacter {
  user_id: number;
  steam_target: string;
  characters: ICharacterData[];
}
export interface ICharacterData {
  index: number;
  first_name: string;
  last_name: string;
  sex: Sex;
  date_of_birth: Date;
  last_location: LastLocation;
  internet_handle: string;
  funding: {
    cash: number;
    bank: IBankAccount[];
    pin: string;
    crypto: {
      yumSats: number;
      jizzCoin: number;
      transactions: ITransaction[];
    };
  };
  steam_target: string;
  phone_number: string;
  appearance: any;
  licenses: {
    weapon: IWeaponLicenses;
    vehicle: IVehicleLicenses;
    pilot: IPilotLicenses;
    business: IBusinessLicenses;
  };
  tax_bracket: string;
  criminal_record: ICriminalRecord;
  employment: any[];
  keys: any[];
  welfare: {
    needs: IBasicNeeds;
    medicalStatus: MedicalStatus;
    medicalHistory: IMedicalHistory[];
    medicalBills: IMedicalBill[];
  };
}

export type Sex = "Male" | "Female";
export type LastLocation = { x: number; y: number; z: number; heading: number };

export interface ICriminalRecord {
  warrants: any[];
  convictions: any[];
  arrests: any[];
  tickets: any[];
}
export interface IMedicalBill {
  id: number;
  amount: number;
  paid: boolean;
  date: Date;
}

export interface IMedicalHistory {
  date: Date;
  diagnosis: string;
  treatment: string;
  doctor: string;
  billId: number;
  paid: boolean;
}

export type MedicalStatus =
  | "healthy"
  | "injured"
  | "recovering"
  | "critical"
  | "dead";

export interface IBasicNeeds {
  health: number;
  hunger: number;
  thirst: number;
  bloodLevel: number;
  oxygenLevel: number;
  stress: number;
  adrenaline: number;
  stamina: number;
  armor: number;
}
export interface IBusinessLicenses {
  business: LicenseBase[];
  realEstate: LicenseBase;
  stockBroker: LicenseBase;
}
export interface IPilotLicenses {
  commercial: LicenseBase;
  private: LicenseBase;
  airTrafficController: LicenseBase;
}
export interface LicenseBase {
  id: number;
  active: boolean;
  owned: boolean;
}
export interface IWeaponLicenses {
  possession: LicenseBase;
  hunting: LicenseBase;
  sportShooting: LicenseBase;
  dealers: LicenseBase;
  classIII: LicenseBase;
}

export interface IVehicleLicenses {
  classD: LicenseBase;
  classC: LicenseBase; // buses / garbage
  classA: LicenseBase; // trucks
  classM: LicenseBase; // motorcycles
}

export type TransactionType = "deposit" | "withdrawal" | "transfer";

export interface ITransaction {
  account_number: number;
  amount: number;
  date: Date;
  type: TransactionType;
  description: string;
}

export interface IBankAccount {
  user_id: number;
  account_number: number;
  balance: number;
  transactions: ITransaction[];
}
