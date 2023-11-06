import {
  IBankAccount,
  IBasicNeeds,
  IBusinessLicenses,
  ICharacterData,
  ICriminalRecord,
  IMedicalBill,
  IMedicalHistory,
  IPilotLicenses,
  ITransaction,
  IVehicleLicenses,
  IWeaponLicenses,
  LastLocation,
  MedicalStatus,
  Sex,
} from "config/interfaces/ICharacter";
import { __databaseInstance } from "server";

export class CreateNewCharacter {
  first_name: string;
  last_name: string;
  sex: string;
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
  constructor(
    steam: string,
    first_name: string,
    last_name: string,
    sex: string,
    age: any,
    netHandle: string,
    lastLocation: { x: number; y: number; z: number; heading: number },
    funds: {
      cash: number;
      bank: any[];
      pin: string;
      crypto: { yumSats: number; jizzCoin: number; transactions: any[] };
    },
    appearance: any,
    licenses: {
      weapon: IWeaponLicenses;
      vehicle: IVehicleLicenses;
      pilot: IPilotLicenses;
      business: IBusinessLicenses;
    },
    taxBracket: string,
    criminalRecord: ICriminalRecord,
    employment: any[],
    keys: any[],
    welfare: {
      needs: IBasicNeeds;
      medicalStatus: MedicalStatus;
      medicalHistory: IMedicalHistory[];
      medicalBills: IMedicalBill[];
    }
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.appearance = appearance;
    this.criminal_record = criminalRecord;
    this.date_of_birth = age;
    this.employment = employment;
    this.funding = funds;
    this.internet_handle = netHandle;
    this.keys = keys;
    this.last_location = lastLocation;
    this.licenses = licenses;
    this.sex = sex;
    this.steam_target = steam;
    this.tax_bracket = taxBracket;
    this.welfare = welfare;
  }

  public CreatePhoneNumber() {
    const __areaCode = 702;
    const __phoneNumberString = Math.floor(Math.random() * 10000000).toString();
    const __phoneNumber = __areaCode + __phoneNumberString;
    return __phoneNumber;
  }

  public async build() {
    const __characterCount = await __databaseInstance.CountCharactersForUser({
      steam_target: this.steam_target,
    });
    let isUnique = false;
    do {
      this.phone_number = this.CreatePhoneNumber();
      isUnique = await __databaseInstance.CheckPhoneNumber({
        phone_number: this.phone_number,
      });
    } while (isUnique);

    const __builder: ICharacterData = {
      index: __characterCount,
      first_name: this.first_name,
      last_name: this.last_name,
      sex: this.sex as Sex,
      date_of_birth: this.date_of_birth,
      last_location: this.last_location,
      internet_handle: this.internet_handle,
      funding: this.funding,
      steam_target: this.steam_target,
      phone_number: this.phone_number,
      appearance: this.appearance,
      licenses: this.licenses,
      tax_bracket: this.tax_bracket,
      criminal_record: this.criminal_record,
      employment: this.employment,
      keys: this.keys,
      welfare: this.welfare,
    };

    return __builder;
  }
}
