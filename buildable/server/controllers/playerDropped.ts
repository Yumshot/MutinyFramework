<<<<<<< HEAD
/**
 * Event listener for when a player drops from the server.
 * @param reason The reason for the player's disconnection.
 */
=======
>>>>>>> dffda90 (feat(server): add entityCreated, entityCreating, mumbleConnected, playerDropped, playerJoining)
on("playerDropped", (reason: any) => {
  console.log(
    `Player ${GetPlayerName(
      global.source.toString()
    )} dropped (Reason: ${reason}).`
  );
  //TODO - Check Player Data changes, and update the database accordingly.
});
