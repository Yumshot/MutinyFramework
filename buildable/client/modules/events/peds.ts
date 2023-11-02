function SetupJobPeds(pedHandle: number) {
  SetEntityAsMissionEntity(pedHandle, true, true);
  SetBlockingOfNonTemporaryEvents(pedHandle, true);
  SetPedFleeAttributes(pedHandle, 0, false);
  SetPedCombatAttributes(pedHandle, 17, true);
  SetPedCombatAttributes(pedHandle, 5, true);
  SetPedCombatAttributes(pedHandle, 46, true);
  SetPedCombatAttributes(pedHandle, 26, true);
  SetPedCombatAttributes(pedHandle, 0, true);
  SetPedCombatAttributes(pedHandle, 2, true);
  SetPedRelationshipGroupHash(pedHandle, GetHashKey("CIVMALE"));
  SetRelationshipBetweenGroups(0, GetHashKey("CIVMALE"), GetHashKey("PLAYER"));
  SetRelationshipBetweenGroups(0, GetHashKey("PLAYER"), GetHashKey("CIVMALE"));
  FreezeEntityPosition(pedHandle, true);
  SetPedDiesWhenInjured(pedHandle, false);
  SetPedConfigFlag(pedHandle, pedHandle, true);
  SetPedConfigFlag(pedHandle, 184, true);
  SetPedConfigFlag(pedHandle, 429, true);
  SetPedConfigFlag(pedHandle, 281, true);
  SetEntityInvincible(pedHandle, true);
}

onNet("setupJobPeds", async () => {
  const npcs = GetGamePool("CPed");
  for (let i = 0; i < npcs.length; i++) {
    const ped = npcs[i];
    if (ped !== PlayerPedId() && !IsPedAPlayer(ped)) {
      const scenarioState = Entity(ped).state.scenario;
      if (scenarioState) {
        SetupJobPeds(ped);
        TaskStartScenarioInPlace(ped, scenarioState, 0, true);
      }
    }
  }
});
