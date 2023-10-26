on("playerDropped", (reason: any) => {
  console.log(
    `Player ${GetPlayerName(
      global.source.toString()
    )} dropped (Reason: ${reason}).`
  );
  //TODO - Check Player Data changes, and update the database accordingly.
});
