import { CreateNotification } from "classes/Notification";
import { Delay } from "modules/utils/delay";

global.exports.ox_target.addModel("prop_parking_hut_2", {
  label: "View Garage",
  name: "view_garage",
  icon: "fa-solid fa-square-parking",
  distance: 2.5,
  onSelect: async (target: any) => {
    console.log("View Garage");
  },
});

global.exports.ox_target.addModel("prop_parknmeter_01", {
  label: "View Garage",
  name: "view_garage",
  icon: "fa-solid fa-square-parking",
  distance: 2.5,
  onSelect: async (target: any) => {
    console.log("View Garage");
  },
});
