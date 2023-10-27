/**
 * Logs the current location and rotation of the player to the console and chat.
 * @returns void
 */
export const DebugLocation = () => {
  const ped = PlayerPedId();
  const coords = GetEntityCoords(ped, true);
  const heading = GetEntityHeading(ped);
  const rotation = GetGameplayCamRot(2);
  const output = `{x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2]}, heading: ${heading}, rotation: ${rotation}}`;
  emit("chat:addMessage", {
    args: [output],
  });
  console.log(output);
};
