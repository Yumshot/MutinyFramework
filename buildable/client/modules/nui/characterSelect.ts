export function SendCharacterSelect(
  characters: any,
  last: number,
  target: any
) {
  SetNuiFocus(true, true);
  SendNUIMessage({
    event: "__openCharacter",
    state: true,
    options: characters,
  });
}
