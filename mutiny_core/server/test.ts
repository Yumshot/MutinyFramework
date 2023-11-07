import { __databaseInstance } from "server";

RegisterCommand(
  "test",
  async (source: number, args: string[]) => {
    const db = __databaseInstance;
    for (let i = 0; i < 100000; i++) {
      setTimeout(async () => {
        await db.SetNewUserData({
          id: i,
          steam_target: `steam:${i}`,
          identifiers: [i.toString()],
          name: `test${i}`,
          banned: false,
          permissions: 0,
          hex: "FFFFFF",
          priority: 0,
          last_connection: new Date(),
          last_ip: "asdasdasda" + i,
          last_character: 0,
          characters: [],
        });
      }, 1000);
    }
  },
  false
);

// OUT OF MEMORY ERROR
// RegisterCommand(
//   "test",
//   async (source: number, args: string[]) => {
//     const db = __databaseInstance;
//     for (let i = 0; i < 500000; i++) {
//       setTimeout(async () => {
//         await db.SetNewUserData({
//           id: i,
//           steam_target: `steam:${i}`,
//           identifiers: [i.toString()],
//           name: `test${i}`,
//           banned: false,
//           permissions: 0,
//           hex: "FFFFFF",
//           priority: 0,
//           last_connection: new Date(),
//           last_ip: "asdasdasda" + i,
//           last_character: 0,
//           characters: [],
//         });
//       }, 500);
//     }
//   },
//   false
// );
