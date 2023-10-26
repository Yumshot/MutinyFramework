let loadingScreen = false;

setImmediate(() => {
  on("mumbleConnected", () => {
    if (loadingScreen) return;
    ShutdownLoadingScreenNui();
    loadingScreen = !loadingScreen;
  });
});
