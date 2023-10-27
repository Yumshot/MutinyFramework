onNet("MUTINY:CORE:CLIENT:NOTIFY_FROM_SERVER", (data: any) => {
  console.log("HERE, NOTIFY_FROM_SERVER ", data);
  emit("MUTINY:NOTIFY:CREATE_NOTIFY", data);
});
