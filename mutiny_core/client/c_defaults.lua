Config = {}

Config.VehicleEnterKey = 49 -- they button you press when entering a vehicle / Default 'F - 49'
Config.SecondKey = 19       -- Default '19 - ALT' is used to access hanging spots on cars

Config.ShuffCommand = 'shuff'



Citizen.CreateThread(function()
    while true do
        local playerId = PlayerId();
        if (NetworkIsPlayerActive(playerId)) then
            DisablePlayerVehicleRewards(playerId)
        end
        Citizen.Wait(0)
    end
end)

AddEventHandler("playerSpawned", function()
    SetNuiFocus(false, false)
    Citizen.Wait(1000)
    Citizen.CreateThread(function()
        DisplayHud(false)
        local ped = PlayerPedId()
        local playerId = PlayerId()
        if not DoesEntityExist(ped) then
            return
        end
        NetworkSetFriendlyFireOption(true)               -- Enable Friendly Fire
        SetCanAttackFriendly(ped, true, true)            -- Enable Friendly Fire
        SetMaxWantedLevel(0)                             -- Set Max Wanted Level to 0
        SetCreateRandomCops(false)                       -- Prevent AI Cop Creation
        SetCreateRandomCopsNotOnScenarios(false)         -- Prevent AI Cop Creation
        SetCreateRandomCopsOnScenarios(false)            -- Prevent AI Cop Creation
        SetPlayerHealthRechargeLimit(playerId, 0)        -- Disable Health Recharge
        SetPlayerHealthRechargeMultiplier(playerId, 0.0) -- Disable Health Recharge
        SetPedCanBeKnockedOffVehicle(ped, 0)             -- Disable Ped Knocked Off Vehicle
        SetAggressiveHorns(false)                        -- Disable Aggressive Horns
        SetPoliceIgnorePlayer(ped, true)                 -- Disable Police Ignore Player
        SetPedMinGroundTimeForStungun(ped, 6000)         -- Time spent on ground after being tased (in ms)
        StartAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE") -- disable shity ambience
    end)
end)
---------------------------------------------------------------------------
--- Core Thread
---------------------------------------------------------------------------
Citizen.CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)
        ----------------------Remove Police Audio----------------------------------	
        DistantCopCarSirens(false)
        CancelCurrentPoliceReport();
        ----------------------Hiding Hud Components--------------------------------
        SetPedConfigFlag(ped, 35, false) --To prevent auto-motorcycle helmet
        ---------------------------------------------------------------------------
        if IsPedInAnyVehicle(ped, false) and IsVehicleDriveable(vehicle, false) and GetPedInVehicleSeat(vehicle, -1) == ped
        then
            DisplayRadar(true)
            Citizen.Wait(50)
            SendNuiMessage(json.encode({
                event = "__openVehicle",
                state = true,
                options = {
                    speed = {
                        mph = math.ceil(GetEntitySpeed(vehicle) * 2.236936),
                    }
                }
            }))
        else
            DisplayRadar(false)
            SendNuiMessage(json.encode({
                event = "__openVehicle",
                state = false,
            }))
        end
        Citizen.Wait(100)
    end
end)

Citizen.CreateThread(function() -- no idle
    while true do
        Citizen.Wait(5000)
        InvalidateIdleCam()
    end
end)
---------------------------------------------------------------------------
--- Prevent NPCs from dropping weapons when dead
---------------------------------------------------------------------------
function RemoveWeaponDrops()
    local pickupList = { `PICKUP_AMMO_BULLET_MP`, `PICKUP_AMMO_FIREWORK`, `PICKUP_AMMO_FLAREGUN`,
        `PICKUP_AMMO_GRENADELAUNCHER`, `PICKUP_AMMO_GRENADELAUNCHER_MP`, `PICKUP_AMMO_HOMINGLAUNCHER`, `PICKUP_AMMO_MG`,
        `PICKUP_AMMO_MINIGUN`, `PICKUP_AMMO_MISSILE_MP`, `PICKUP_AMMO_PISTOL`, `PICKUP_AMMO_RIFLE`, `PICKUP_AMMO_RPG`,
        `PICKUP_AMMO_SHOTGUN`, `PICKUP_AMMO_SMG`, `PICKUP_AMMO_SNIPER`, `PICKUP_ARMOUR_STANDARD`, `PICKUP_CAMERA`,
        `PICKUP_CUSTOM_SCRIPT`, `PICKUP_GANG_ATTACK_MONEY`, `PICKUP_HEALTH_SNACK`, `PICKUP_HEALTH_STANDARD`,
        `PICKUP_MONEY_CASE`, `PICKUP_MONEY_DEP_BAG`, `PICKUP_MONEY_MED_BAG`, `PICKUP_MONEY_PAPER_BAG`,
        `PICKUP_MONEY_PURSE`, `PICKUP_MONEY_SECURITY_CASE`, `PICKUP_MONEY_VARIABLE`, `PICKUP_MONEY_WALLET`,
        `PICKUP_PARACHUTE`, `PICKUP_PORTABLE_CRATE_FIXED_INCAR`, `PICKUP_PORTABLE_CRATE_UNFIXED`,
        `PICKUP_PORTABLE_CRATE_UNFIXED_INCAR`, `PICKUP_PORTABLE_CRATE_UNFIXED_INCAR_SMALL`,
        `PICKUP_PORTABLE_CRATE_UNFIXED_LOW_GLOW`, `PICKUP_PORTABLE_DLC_VEHICLE_PACKAGE`, `PICKUP_PORTABLE_PACKAGE`,
        `PICKUP_SUBMARINE`, `PICKUP_VEHICLE_ARMOUR_STANDARD`, `PICKUP_VEHICLE_CUSTOM_SCRIPT`,
        `PICKUP_VEHICLE_CUSTOM_SCRIPT_LOW_GLOW`, `PICKUP_VEHICLE_HEALTH_STANDARD`,
        `PICKUP_VEHICLE_HEALTH_STANDARD_LOW_GLOW`, `PICKUP_VEHICLE_MONEY_VARIABLE`, `PICKUP_VEHICLE_WEAPON_APPISTOL`,
        `PICKUP_VEHICLE_WEAPON_ASSAULTSMG`, `PICKUP_VEHICLE_WEAPON_COMBATPISTOL`, `PICKUP_VEHICLE_WEAPON_GRENADE`,
        `PICKUP_VEHICLE_WEAPON_MICROSMG`, `PICKUP_VEHICLE_WEAPON_MOLOTOV`, `PICKUP_VEHICLE_WEAPON_PISTOL`,
        `PICKUP_VEHICLE_WEAPON_PISTOL50`, `PICKUP_VEHICLE_WEAPON_SAWNOFF`, `PICKUP_VEHICLE_WEAPON_SMG`,
        `PICKUP_VEHICLE_WEAPON_SMOKEGRENADE`, `PICKUP_VEHICLE_WEAPON_STICKYBOMB`, `PICKUP_WEAPON_ADVANCEDRIFLE`,
        `PICKUP_WEAPON_APPISTOL`, `PICKUP_WEAPON_ASSAULTRIFLE`, `PICKUP_WEAPON_ASSAULTSHOTGUN`,
        `PICKUP_WEAPON_ASSAULTSMG`, `PICKUP_WEAPON_AUTOSHOTGUN`, `PICKUP_WEAPON_BAT`, `PICKUP_WEAPON_BATTLEAXE`,
        `PICKUP_WEAPON_BOTTLE`, `PICKUP_WEAPON_BULLPUPRIFLE`, `PICKUP_WEAPON_BULLPUPSHOTGUN`,
        `PICKUP_WEAPON_CARBINERIFLE`, `PICKUP_WEAPON_COMBATMG`, `PICKUP_WEAPON_COMBATPDW`, `PICKUP_WEAPON_COMBATPISTOL`,
        `PICKUP_WEAPON_COMPACTLAUNCHER`, `PICKUP_WEAPON_COMPACTRIFLE`, `PICKUP_WEAPON_CROWBAR`, `PICKUP_WEAPON_DAGGER`,
        `PICKUP_WEAPON_DBSHOTGUN`, `PICKUP_WEAPON_FIREWORK`, `PICKUP_WEAPON_FLAREGUN`, `PICKUP_WEAPON_FLASHLIGHT`,
        `PICKUP_WEAPON_GRENADE`, `PICKUP_WEAPON_GRENADELAUNCHER`, `PICKUP_WEAPON_GUSENBERG`, `PICKUP_WEAPON_GOLFCLUB`,
        `PICKUP_WEAPON_HAMMER`, `PICKUP_WEAPON_HATCHET`, `PICKUP_WEAPON_HEAVYPISTOL`, `PICKUP_WEAPON_HEAVYSHOTGUN`,
        `PICKUP_WEAPON_HEAVYSNIPER`, `PICKUP_WEAPON_HOMINGLAUNCHER`, `PICKUP_WEAPON_KNIFE`, `PICKUP_WEAPON_KNUCKLE`,
        `PICKUP_WEAPON_MACHETE`, `PICKUP_WEAPON_MACHINEPISTOL`, `PICKUP_WEAPON_MARKSMANPISTOL`,
        `PICKUP_WEAPON_MARKSMANRIFLE`, `PICKUP_WEAPON_MG`, `PICKUP_WEAPON_MICROSMG`, `PICKUP_WEAPON_MINIGUN`,
        `PICKUP_WEAPON_MINISMG`, `PICKUP_WEAPON_MOLOTOV`, `PICKUP_WEAPON_MUSKET`, `PICKUP_WEAPON_NIGHTSTICK`,
        `PICKUP_WEAPON_PETROLCAN`, `PICKUP_WEAPON_PIPEBOMB`, `PICKUP_WEAPON_PISTOL`, `PICKUP_WEAPON_PISTOL50`,
        `PICKUP_WEAPON_POOLCUE`, `PICKUP_WEAPON_PROXMINE`, `PICKUP_WEAPON_PUMPSHOTGUN`, `PICKUP_WEAPON_RAILGUN`,
        `PICKUP_WEAPON_REVOLVER`, `PICKUP_WEAPON_RPG`, `PICKUP_WEAPON_SAWNOFFSHOTGUN`, `PICKUP_WEAPON_SMG`,
        `PICKUP_WEAPON_SMOKEGRENADE`, `PICKUP_WEAPON_SNIPERRIFLE`, `PICKUP_WEAPON_SNSPISTOL`,
        `PICKUP_WEAPON_SPECIALCARBINE`, `PICKUP_WEAPON_STICKYBOMB`, `PICKUP_WEAPON_STUNGUN`, `PICKUP_WEAPON_SWITCHBLADE`,
        `PICKUP_WEAPON_VINTAGEPISTOL`, `PICKUP_WEAPON_WRENCH`, `PICKUP_WEAPON_RAYCARBINE` }
    local player = PlayerId()
    for a = 1, #pickupList do
        ToggleUsePickupsForPlayer(player, pickupList[a], false)
    end
end

isActive = false;
autoPilotTimer = 2500;
driveThread = nil;

---------------------------------------------------------------------------
RegisterNetEvent('handleAutoPilot')
AddEventHandler('handleAutoPilot', function(value)
    checkAutoPilotToggle(value[1])
    if value[1] == 'start' then
        mode = checkAutoPilotMode(value[2])
        ped = PlayerPedId()
        vehicle = GetVehiclePedIsIn(ped, false)
        local blip = GetFirstBlipInfoId(8)
        blipCoords = GetBlipCoords(blip)
        local startDistance = #(GetEntityCoords(ped) - blipCoords)
        if not IsPedInAnyVehicle(ped, false) or not IsVehicleDriveable(vehicle, false) or GetPedInVehicleSeat(vehicle, -1) ~= ped then
            return
        end
        if startDistance >= 100 then
            driveThread = Citizen.CreateThread(function()
                while isActive do
                    local distance = #(GetEntityCoords(ped) - blipCoords)
                    if distance >= 50.0 then
                        TaskVehicleDriveToCoordLongrange(ped, vehicle, blipCoords.x, blipCoords.y, blipCoords.z, mode[1],
                            mode[2], 5.0)
                    elseif distance >= 25.0 then
                        TaskVehicleDriveToCoordLongrange(ped, vehicle, blipCoords.x, blipCoords.y, blipCoords.z, 10.0,
                            mode[2], 2.0)
                    else
                        checkAutoPilotToggle('stop')
                    end
                    Citizen.Wait(autoPilotTimer)
                end
            end)
        end
    end
end)




function checkAutoPilotToggle(value)
    if value == 'start' then
        isActive = true;
        autoPilotTimer = 500;
        local notification = {
            title = 'Autism Autopilot',
            text = "Autopilot has been started, please do not leave the vehicle.",
            icon =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 17l-1-4l-4-1l9-4z"></path></g></svg>',
            position = "top-right",
            sticky = true,
            width = "auto",
            progress = "auto",
        };

        TriggerEvent("clientNotify", notification);
    elseif value == 'stop' then
        isActive = false;
        autoPilotTimer = 2500;
        local notification = {
            title = 'Autism Autopilot',
            text = "Autopilot has been stopped.",
            color = "danger",
            icon =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M18 1c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm0 6c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5zm.5 1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5s.22-.5.5-.5s.5.22.5.5zm1 11.5c.82 0 1.5-.67 1.5-1.5v-6.18c-1.05.51-2.16.69-3.09.68c.06.16.09.33.09.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5c0-.39.15-.74.39-1.01A7.032 7.032 0 0 1 11.68 9H5.81l1.04-3H11c0-.69.1-1.37.29-2H6.5c-.66 0-1.21.42-1.42 1.01l-1.97 5.67c-.07.21-.11.43-.11.66v7.16c0 .83.67 1.5 1.5 1.5S6 19.33 6 18.5V18h12v.5c0 .83.68 1.5 1.5 1.5zm-12-5c-.83 0-1.5-.67-1.5-1.5S6.67 12 7.5 12s1.5.67 1.5 1.5S8.33 15 7.5 15z" fill="currentColor"></path></svg>',
            position = "top-right",
            sticky = true,
            width = "auto",
            progress = "auto",
        };
        TriggerEvent("clientNotify", notification);
        ClearPedTasks(PlayerPedId())
        if driveThread ~= nil then
            Citizen.Wait(1000)
            Citizen.KillThread(driveThread)
        end
    end
end

function checkAutoPilotMode(value)
    speed = 25.0;
    driveModifier = 447;
    value = tonumber(value)

    if value == 1 then
        speed = 25.0;
        driveModifier = 447;
    end

    if value == 2 then
        speed = 95.0;
        driveModifier = 787261;
    end

    return { speed, driveModifier };
end

local stopShuffle = true

function DenyShuffle()
    stopShuffle = true
end

function AllowShuffle()
    stopShuffle = false
end

RegisterNetEvent('shuff')
AddEventHandler('shuff', function()
    local playerPed = PlayerPedId()

    if IsPedInAnyVehicle(playerPed, false) then
        AllowShuffle()

        Wait(5000)

        DenyShuffle()
    else
        CancelEvent()
    end
end)

RegisterCommand(Config.ShuffCommand, function(source, args, raw)
    TriggerEvent('shuff')
end, false)

CreateThread(function()
    while true do
        local playerPed = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(playerPed, false)

        if IsPedInAnyVehicle(playerPed, false) and stopShuffle then
            Wait(0)
            if GetPedInVehicleSeat(vehicle, 0) == playerPed then
                if GetIsTaskActive(playerPed, 165) then
                    SetPedIntoVehicle(playerPed, vehicle, 0)
                end
            end
        else
            Wait(500)
        end
    end
end)
