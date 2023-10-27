import { Delay, SetupJobPeds, getRandomInRange } from "utils/functions";
import { DEFAULTS, LOCALES } from "../../common/globals";
import { INotification } from "../../common/interfaces/Notification";
import { Blip, Model, Vector3, Vehicle, World } from "fivem-js";

const VEHICLE_MODELS_DOCK_WORK = ["tankercar", "hauler", "docktug"];
const VEHICLE_MODEL_TO_UNLOAD = ["prop_truktrailer_01a", "docktrailer"];
const CHAIR_MODEL = "prop_table_03_chr";
const DEFAULT_VEHICLE_SPAWNS = [
  {
    heading: 0,
    pack: new Vector3(-403.1604309082031, -2284.2724609375, 7.223388671875),
  },
];
const DOCK_WORK_RANK_ONE_TASKS = [
  {
    type: "Equipment",
    description:
      "One of the cranes at the dockyard has malfunctioned and needs a specific part for repairs. Maria provides you with the part's details and asks you to pick it up from a nearby warehouse",
    locations: [
      {
        name: "PICKUPLOCATION",
        x: 141.73187255859375,
        y: -3326.4658203125,
        z: 6.01025390625,
        heading: 277.7952880859375,
        pack: new Vector3(141.73187255859375, -3326.4658203125, 6.01025390625),
        cargo: {
          loc: new Vector3(118.18022155761719, -3338.28125, 5.6226806640625),
          heading: 269.2913513183594,
        },
      },
      {
        name: "PICKUPLOCATION",
        x: -1035.5867919921875,
        y: -2210.10986328125,
        z: 8.975830078125,
        heading: 223.93701171875,
        pack: new Vector3(
          -1035.5867919921875,
          -2210.10986328125,
          8.975830078125
        ),
        cargo: {
          heading: 223.93701171875,
          loc: new Vector3(
            -1033.5296630859375,
            -2216.03076171875,
            8.5882568359375
          ),
        },
      },
    ],
  },
];

let jobBlip: Blip;
let jobVehicle: Vehicle;
let lentVehicle: Vehicle;
let onPickupJob = false;

onNet(
  "MUTINY:CORE:CLIENT:CHARACTER:JOBS:ELIGIBLE_CHECK:RESPONSE",
  (data: any) => {
    setTimeout(async () => {
      switch (data.result.rank) {
        case 0:
          //TODO - fix this when i add more quests
          const job = getRandomInRange(
            0,
            DOCK_WORK_RANK_ONE_TASKS[0].locations.length - 1
          );
          const location = DOCK_WORK_RANK_ONE_TASKS[0].locations[job];
          if (jobBlip) {
            RemoveBlip(jobBlip.Handle);
          }
          if (DOCK_WORK_RANK_ONE_TASKS[0].type === "Equipment") {
            const vehicle = await World.createVehicle(
              new Model(VEHICLE_MODELS_DOCK_WORK[1]),
              DEFAULT_VEHICLE_SPAWNS[0].pack,
              DEFAULT_VEHICLE_SPAWNS[0].heading
            );
            vehicle.FuelLevel = 100;
            vehicle.NumberPlate = "DOCKWORK";
            lentVehicle = vehicle;
          }
          setTimeout(async () => {
            const loc = new Vector3(location.x, location.y, location.z);
            const ped = await World.createPed(
              new Model("s_m_y_xmech_01"),
              new Vector3(location.x, location.y, location.z - 1),
              location.heading
            );

            SetupJobPeds(ped.Handle);
            jobBlip = World.createBlip(loc);
            jobBlip.Sprite = 479;
            jobBlip.Color = 5;
            jobBlip.Display = 4;
            jobBlip.ShowRoute = true;
            jobBlip.FlashTimer = DEFAULTS.DELAY_60 * 10;
            jobBlip.Name = DOCK_WORK_RANK_ONE_TASKS[0].type;

            const notification: INotification = {
              title: DOCK_WORK_RANK_ONE_TASKS[0].type,
              text:
                DOCK_WORK_RANK_ONE_TASKS[0].description +
                " Check your map for the location. You have 10 minutes to complete this task.",
              position: "top-right",
              duration: 15000,
              sticky: true,
              width: "auto",
              progress: "auto",
              icon: LOCALES.NOTIFICATIONS.DOCK_WORKER_ICON,
            };
            emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
            const vehicle = await World.createVehicle(
              new Model(VEHICLE_MODEL_TO_UNLOAD[1]),
              DOCK_WORK_RANK_ONE_TASKS[0].locations[job].cargo.loc,
              DOCK_WORK_RANK_ONE_TASKS[0].locations[job].cargo.heading
            );
            vehicle.NumberPlate = "DOCKWORK";
            jobVehicle = vehicle;
            setTick(async () => {
              if (onPickupJob) {
                if (IsVehicleAttachedToTrailer(lentVehicle.Handle)) {
                  if (
                    GetEntityAttachedTo(lentVehicle.Handle) ===
                    jobVehicle.Handle
                  ) {
                    console.log("JOB STARTING");
                  }
                }
              }

              await Delay(1000);
            });
            setTimeout(() => {
              if (lentVehicle.Handle) {
                RemoveBlip(jobBlip.Handle);
              }
            }, DEFAULTS.DELAY_60 * 10);
          }, getRandomInRange(10000, 30000));

          break;
      }
    }, 5000);
  }
);
