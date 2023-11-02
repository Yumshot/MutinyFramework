import { CreateNotification } from "classes/Notification";
import { Vector3 } from "classes/Vector3";
import { CLOTHING_STORE_BLIPS } from "config/blips";
import { Delay } from "modules/utils/delay";

for (const blip of CLOTHING_STORE_BLIPS) {
  global.exports.ox_target.addSphereZone({
    coords: new Vector3([blip.x, blip.y, blip.z]),
    radius: 5,
    // debug: true,
    options: [
      {
        label: "Change Clothes",
        name: "enter_clothing_store",
        icon: "fa-solid fa-shirt fa-beat",
        onSelect: async (target: any) => {
          new CreateNotification({
            title: "Clothing Store",
            text: "Entering Clothing Store",
            duration: 2500,
            progress: "auto",
          });
          await Delay(2500);

          global.exports.mutiny_appearance.startPlayerCustomization(
            (appearance: any) => {
              if (appearance) {
                emitNet(
                  "genericSaveAppearanceDataServerEvent",
                  JSON.stringify(appearance)
                );
              } else {
                console.log("Customization canceled");
              }
            }
          );
        },
      },
    ],
  });
}
