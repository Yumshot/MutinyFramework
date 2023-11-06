import { Delay } from "modules/utils/delay";

global.exports.ox_target.addModel("-1555905221", {
  label: "Operate Lift",
  name: "lift_car",
  icon: "fa-solid fa-arrow-down-up-across-line",
  distance: 1,
  onSelect: async (target: any) => {
    const entity = target.entity;
    if (entity) {
      const coords = GetEntityCoords(entity, false);
      const vehicle = GetClosestVehicle(
        coords[0],
        coords[1],
        coords[2],
        1.5,
        0,
        70
      );
      if (vehicle === 0) return;
      await Delay(5);
      SetEntityHeading(vehicle, 353.0);
      SetVehicleDoorOpen(vehicle, 4, false, true);
    }
  },
});
