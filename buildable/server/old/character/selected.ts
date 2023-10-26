export let SELECTED_CHARACTER: any;

onNet(
  "MUTINY:CORE:SERVER:CHARACTER:SELECTED:SELECTED_CHARACTER",
  async (reference: any) => {
    const src = source;
    SELECTED_CHARACTER = reference;
    if (SELECTED_CHARACTER !== null) {
      emitNet(
        "MUTINY:CORE:CLIENT:HANDLERS:CALLBACKS:LOAD_CHARACTER",
        src,
        SELECTED_CHARACTER
      );
    } else {
      return console.log("ERROR IN MUTINY:CORE:SERVER:SELECTED_CHARACTER");
    }
  }
);
