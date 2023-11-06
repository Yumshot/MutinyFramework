import fs from "fs";
import { join } from "path";
on("getLoc", (source: any, params?: any) => {
  console.log(source);
  const player = GetPlayerPed(source);
  const coords = GetEntityCoords(player);
  const heading = GetEntityHeading(player);
  const label = {
    x: coords[0],
    y: coords[1],
    z: coords[2],
    heading: heading,
    label: params,
  };
  const file = "locations.ts";
  const dir = "C:\\Code\\mutiny\\mutiny-framework\\buildable\\docs";
  const path = join(dir, file);

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "export const locations = []");
  }
  //read the file and parse the context looking for the array, if it exists push the new location to the array
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    const result = data.replace(
      "export const locations = [",
      "export const locations = [" + JSON.stringify(label) + ","
    );
    fs.writeFile(path, result, "utf8", function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
});
