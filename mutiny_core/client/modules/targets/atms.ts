import { CreateNotification } from "classes/Notification";
import { Delay } from "modules/utils/delay";

global.exports.ox_target.addModel("prop_atm_03", {
  label: "Use ATM",
  name: "atm",
  icon: "fa-solid fa-money-bills fa-beat",
  distance: 2.5,
  onSelect: async (target: any) => {
    console.log("View ATM");
  },
});
global.exports.ox_target.addModel("prop_atm_02", {
  label: "Use ATM",
  name: "atm",
  icon: "fa-solid fa-money-bills fa-beat",
  distance: 2.5,
  onSelect: async (target: any) => {
    console.log("View ATM");
  },
});

global.exports.ox_target.addModel("prop_atm_01", {
  label: "Use ATM",
  name: "atm",
  icon: "fa-solid fa-money-bills fa-beat",
  distance: 2.5,
  onSelect: async (target: any) => {
    console.log("View ATM");
  },
});
