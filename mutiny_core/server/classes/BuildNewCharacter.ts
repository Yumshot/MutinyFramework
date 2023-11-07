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

/**
 * Represents a class for creating a new character with various properties.
 * @class
 * @property {string} first_name - The first name of the character.
 * @property {string} last_name - The last name of the character.
 * @property {string} sex - The sex of the character.
 * @property {Date} date_of_birth - The date of birth of the character.
 * @property {LastLocation} last_location - The last location of the character.
 * @property {string} internet_handle - The internet handle of the character.
 * @property {Object} funding - The funding details of the character.
 * @property {number} funding.cash - The cash funding of the character.
 * @property {IBankAccount[]} funding.bank - The bank account funding of the character.
 * @property {string} funding.pin - The pin of the character's funding.
 * @property {Object} funding.crypto - The crypto funding details of the character.
 * @property {number} funding.crypto.yumSats - The yumSats funding of the character.
 * @property {number} funding.crypto.jizzCoin - The jizzCoin funding of the character.
 * @property {ITransaction[]} funding.crypto.transactions - The transactions of the character's crypto funding.
 * @property {string} steam_target - The steam target of the character.
 * @property {string} phone_number - The phone number of the character.
 * @property {Object} appearance - The appearance details of the character.
 * @property {Object} licenses - The licenses of the character.
 * @property {IWeaponLicenses} licenses.weapon - The weapon licenses of the character.
 * @property {IVehicleLicenses} licenses.vehicle - The vehicle licenses of the character.
 * @property {IPilotLicenses} licenses.pilot - The pilot licenses of the character.
 * @property {IBusinessLicenses} licenses.business - The business licenses of the character.
 * @property {string} tax_bracket - The tax bracket of the character.
 * @property {ICriminalRecord} criminal_record - The criminal record of the character.
 * @property {any[]} employment - The employment details of the character.
 * @property {any[]} keys - The keys of the character.
 * @property {Object} welfare - The welfare details of the character.
 * @property {IBasicNeeds} welfare.needs - The basic needs of the character.
 * @property {MedicalStatus} welfare.medicalStatus - The medical status of the character.
 * @property {IMedicalHistory[]} welfare.medicalHistory - The medical history of the character.
 * @property {IMedicalBill[]} welfare.medicalBills - The medical bills of the character.
 */
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
