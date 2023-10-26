on("mumbleConnected", (address: string, reconnecting: boolean): void => {
  console.log("MUMBLE CONNECTED - ");
  console.log(address);
  console.log(reconnecting);
});
