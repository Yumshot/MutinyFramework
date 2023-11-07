Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1500)
        TriggerClientEvent("setupJobPeds", -1)
    end
end)
