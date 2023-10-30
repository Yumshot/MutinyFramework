<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
/**
 * Event listener for when a player drops from the server.
 * @param reason The reason for the player's disconnection.
 */
<<<<<<< HEAD
=======
>>>>>>> dffda90 (feat(server): add entityCreated, entityCreating, mumbleConnected, playerDropped, playerJoining)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
on("playerDropped", (reason: any) => {
  console.log(
    `Player ${GetPlayerName(
      global.source.toString()
    )} dropped (Reason: ${reason}).`
  );
  //TODO - Check Player Data changes, and update the database accordingly.
});
