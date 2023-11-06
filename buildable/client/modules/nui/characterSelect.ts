import { SetTargetCharacter } from "controllers/onGameEventTriggered";

export function SendCharacterSelect(characters: any) {
  SetNuiFocus(true, true);
  SendNUIMessage({
    event: "__openCharacter",
    state: true,
    options: characters,
  });
}

RegisterNuiCallback("__selectedCharacter", (data: any, cb: any) => {
  SetNuiFocus(false, false);
  SetTargetCharacter(data.character);
  cb("ok");
});
