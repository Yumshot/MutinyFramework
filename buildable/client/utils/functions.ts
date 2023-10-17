export const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const MakeModelRequest = (
  model: { model: string | number },
  time: any
) => {
  new Promise<void>(async (res) => {
    RequestModel(model.model);
    while (!HasModelLoaded(model.model)) {
      await Delay(time);
    }
    res();
  });
};

export const GtaHudRadar = (hud: boolean, radar: boolean) => {
  DisplayHud(hud);
  DisplayRadar(radar);
};
