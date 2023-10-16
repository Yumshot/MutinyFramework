let loadingScreen = false;

setImmediate(() => {
  on("playerSpawned", () => {
    if (loadingScreen) return;
    ShutdownLoadingScreenNui();
    loadingScreen = !loadingScreen;
  });
});
