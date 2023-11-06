import { CreateNotification } from "classes/Notification";
import { Vector3 } from "classes/Vector3";
import { Delay } from "modules/utils/delay";

global.exports.ox_target.addModel("ig_djsolmanager", {
  label: "Enter Arcade",
  name: "enter_arcade",
  icon: "fa-solid fa-ghost",
  distance: 2.5,
  onSelect: async (target: any) => {
    new CreateNotification({
      title: "Arcade",
      text: "Entering Arcade",
      duration: 2500,
      progress: "auto",
    });
    const ped = PlayerPedId();
    DoScreenFadeOut(1000);
    await Delay(2500);
    SetEntityCoords(ped, 2737.96, -374.12, -47.99, true, false, false, false);
    SetEntityHeading(ped, 174.4);
    DoScreenFadeIn(1000);
  },
});

global.exports.ox_target.addSphereZone({
  coords: new Vector3([2737.96, -373.7, -47.99]),
  radius: 1,
  // debug: true,
  options: [
    {
      label: "Exit Arcade",
      name: "exit_arcade",
      icon: "fa-solid fa-ghost",
      onSelect: async (target: any) => {
        const ped = PlayerPedId();
        emitNet("setupJobPeds");
        new CreateNotification({
          title: "Arcade",
          text: "Exiting Arcade",
          duration: 2500,
          progress: "auto",
        });
        DoScreenFadeOut(1000);
        await Delay(2500);
        SetEntityCoords(ped, 758.76, -816.06, 26.29, true, false, false, false);
        SetEntityHeading(ped, 278.34);
        DoScreenFadeIn(1000);
      },
    },
  ],
});
