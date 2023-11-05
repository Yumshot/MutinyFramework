import { __commandSystem } from "./commands";
let keys: { key: string; description: string; usage: string }[] = [];
setImmediate(() => {
  for (const key in __commandSystem) {
    RegisterCommand(
      key,
      async (source: any, args: any[]) => {
        await __commandSystem[key as keyof typeof __commandSystem].event([
          source,
          args,
        ]);
      },
      __commandSystem[key as keyof typeof __commandSystem].restricted
    );
    keys.push({
      key: key,
      description:
        __commandSystem[key as keyof typeof __commandSystem].description,
      usage: __commandSystem[key as keyof typeof __commandSystem].usage,
    });
  }

  for (const key in keys) {
    // console.log(keys[key].key, keys[key].description);
    emitNet(
      "chat:addSuggestion",
      -1,
      `/` + keys[key].key,
      keys[key].description,
      [{ name: keys[key].usage, help: "" }]
    );
  }
});
