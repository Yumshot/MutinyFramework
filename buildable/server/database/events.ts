import { DATABASE_COLLECTION_USERS } from "database/init";
import { findSteam } from "utils/functions";

onNet(
  "MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_DATA_FOR_CLIENT",
  async (caller: string) => {
    const src = source;
    const query = findSteam(src);
    const GATHERED_USER = await DATABASE_COLLECTION_USERS.findOne(query);
    console.log(src, query, caller, "emitNet(`${caller}`, src, GATHERED_USER)");
    emitNet(`${caller}`, src, GATHERED_USER);
  }
);

onNet(
  "MUTINY:CORE:SERVER:DATABASE:EVENTS:REMOVE_MONEY_FROM_USER",
  async (
    source: number,
    caller: string,
    amount: number,
    data: any,
    what: string
  ) => {
    const src = source;
    const query = findSteam(src);
    const GATHERED_USER = await DATABASE_COLLECTION_USERS.findOne(query);
    if (GATHERED_USER) {
      const FUNDS =
        GATHERED_USER.characters[GATHERED_USER.last_character].funds.cash
          .amount;
      const BANK =
        GATHERED_USER.characters[GATHERED_USER.last_character].funds.bank[0]
          .balance;
      const NEW_MONEY = FUNDS - amount;
      const NEW_BANK = BANK - amount;
      if (FUNDS >= amount) {
        console.log(
          "REMOVING FROM FUNDS CASH ",
          NEW_MONEY,
          amount,
          GATHERED_USER.name
        );
        emitNet("MUTINY:NOTIFY:CREATE_NOTIFY_FROM_SERVER", src, {
          title: "FINANCES",
          text: `You purchased ${what} for $${amount} cash!`,
        });
        await DATABASE_COLLECTION_USERS.updateOne(query, {
          $set: {
            [`characters.${GATHERED_USER.last_character}.funds.cash.amount`]:
              NEW_MONEY,
          },
        });
        emit(`${caller}`, src, data);
      } else if (BANK >= amount) {
        console.log(
          "REMOVING FROM FUNDS BANK ",
          NEW_BANK,
          amount,
          GATHERED_USER.name
        );
        emitNet("MUTINY:NOTIFY:CREATE_NOTIFY_FROM_SERVER", src, {
          title: "FINANCES",
          text: `You purchased ${what} for $${amount} checking!`,
        });
        await DATABASE_COLLECTION_USERS.updateOne(query, {
          $set: {
            [`characters.${GATHERED_USER.last_character}.funds.bank.0.balance`]:
              NEW_BANK,
          },
        });
        emit(`${caller}`, src, data);
      } else {
        console.log("NOT ENOUGH FUNDS ", amount, GATHERED_USER.name);
        emitNet("MUTINY:NOTIFY:CREATE_NOTIFY_FROM_SERVER", src, {
          title: "FINANCES",
          text: "You do not have enough money to do this!",
        });
      }
    }
  }
);

// onNet("MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_CHARACTER_FOR_CLIENT", async (caller: string) => {

// });
