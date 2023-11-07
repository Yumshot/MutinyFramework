global.exports["cfx-anes-worldsync"].useTime({
  range: [7, 19],
  onStateChange: (state: any) => {
    if (state) {
      emitNet("setupJobPeds");
      // emitNet("requestHiddenDoors", "DAY");
    }
  },
});
global.exports["cfx-anes-worldsync"].useTime({
  range: [19, 7],
  onStateChange: (state: any) => {
    if (state) {
      // emitNet("requestHiddenDoors", "NIGHT");
    }
  },
});
