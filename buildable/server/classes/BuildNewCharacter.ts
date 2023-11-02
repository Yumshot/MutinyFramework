import { ICharacterData, Sex } from "config/interfaces/ICharacter";
import { __databaseInstance } from "server";

export class CreateNewCharacter {
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: any;
  last_location: { x: number; y: number; z: number; heading: number };
  internet_handle: string;
  funding: { cash: number; bank: any[]; pin: string };
  steam_target: string;
  constructor(
    steam: string,
    firstName: string,
    lastName: string,
    sex: string,
    age: any,
    netHandle: string,
    lastLocation: { x: number; y: number; z: number; heading: number },
    funds: { cash: number; bank: any[]; pin: string }
  ) {
    this.steam_target = steam;
    this.first_name = firstName;
    this.last_name = lastName;
    (this.sex = sex), (this.date_of_birth = age);
    this.last_location = lastLocation;
    this.internet_handle = netHandle;
    this.funding = funds;
  }

  public async build() {
    const __characterCount = await __databaseInstance.CountCharactersForUser({
      steam_target: this.steam_target,
    });

    const __builder: ICharacterData = {
      index: __characterCount,
      first_name: this.first_name,
      last_name: this.last_name,
      sex: this.sex as Sex,
      date_of_birth: this.date_of_birth,
      last_location: this.last_location,
      internet_handle: this.internet_handle,
      funding: this.funding,
    };

    return __builder;
  }
}
