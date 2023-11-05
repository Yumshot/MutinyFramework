Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1500)
        TriggerEvent("getServerDoors")
        TriggerClientEvent("setupJobPeds", -1)
    end
end)
