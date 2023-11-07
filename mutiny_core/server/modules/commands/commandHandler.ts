import { __commandSystem } from "./commands";
let keys: { key: string; description: string; usage: string }[] = [];

export const commandHandler = async (src: string) => {
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
  if (keys.length > 0) {
    for (const key in keys) {
      emitNet(
        "chat:addSuggestion",
        src,
        `/` + keys[key].key,
        keys[key].description,
        [{ name: keys[key].usage, help: "" }]
      );
    }
  } else {
    console.log(
      `\n ⌠Mutiny Rp⌡ - No commands found! Please check your command folder!`
    );
  }
};

setImmediate(() => {
  commandHandler("-1");
});
