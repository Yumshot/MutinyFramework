export const FindSteam = (source: string | number) => {
  let steamIdentifier: string = null;
  for (let i = 0; i < GetNumPlayerIdentifiers(<string>source); i++) {
    if (typeof source === "string") {
      const identifier = GetPlayerIdentifier(source, i);
      if (identifier.includes("steam")) {
        steamIdentifier = identifier;
        break;
      }
    } else {
      const identifier = GetPlayerIdentifier(source.toString(), i);
      if (identifier.includes("steam")) {
        steamIdentifier = identifier;
        break;
      }
    }
  }
  return steamIdentifier ? steamIdentifier : null;
};
