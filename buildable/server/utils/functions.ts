export const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const findSteam = (source: string | number) => {
  let steamIdentifier: string = null;

  for (let i = 0; i < GetNumPlayerIdentifiers(source as string); i++) {
    const identifier = GetPlayerIdentifier(source as string, i);

    if (identifier.includes("steam:")) {
      steamIdentifier = identifier;
    }
  }

  const query = { steam: steamIdentifier };

  return query;
};

export function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getRandomPosition(coordinates: any[]) {
  let minX = Math.min(...coordinates.map((coord: { x: any }) => coord.x));
  let maxX = Math.max(...coordinates.map((coord: { x: any }) => coord.x));
  let minY = Math.min(...coordinates.map((coord: { y: any }) => coord.y));
  let maxY = Math.max(...coordinates.map((coord: { y: any }) => coord.y));

  return {
    x: getRandomInRange(minX, maxX),
    y: getRandomInRange(minY, maxY),
  };
}
