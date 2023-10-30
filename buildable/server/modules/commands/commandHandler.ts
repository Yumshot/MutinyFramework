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
  emitNet(
    "chat:addSuggestions",
    -1,
    keys.map((key) => {
      return { name: key.key, help: key.description, params: key.usage };
    })
  );
});
