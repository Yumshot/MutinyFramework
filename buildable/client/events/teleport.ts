onNet("MUTINY:CORE:CLIENT:HANDLE_TELEPORT", (coords: { x: number; y: number; z: number; heading: number; }) => {
    const ped = PlayerPedId();
    DoScreenFadeOut(10000);
    FreezeEntityPosition(ped, true)
    setTimeout(() => {
        SetEntityInvincible(ped, true);
        SetEntityCoordsNoOffset(
          ped,
          coords.x,
          coords.y,
          coords.z,
          false,
          false,
          false
        );
        SetEntityHeading(ped, coords.heading);
        setTimeout(() => {
            DoScreenFadeIn(10000);
            SetEntityInvincible(ped, false);
             FreezeEntityPosition(ped, false);
        }, 10000);
    }, 10000);
})