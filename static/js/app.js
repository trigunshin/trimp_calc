'use strict';
//////////////////
//     app      //
//////////////////
var clickerCalcs = angular.module('trimpCalcApp', []);
clickerCalcs.controller('TrimpCalcCtrl', function($scope) {
    $scope.keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    $scope.keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    $scope.weapons = ['Dagger', 'Mace', 'Polearm', 'Battleaxe', 'Greatsword'];
    $scope.armor = ['Boots', 'Helmet', 'Pants', 'Shoulderguards', 'Breastplate'];
    $scope.block = ['Shield'];
    $scope.show_items = [['Shield', $scope.block], ['Weapons', $scope.weapons], ['Armor', $scope.armor]];

    $scope.defaults = newGame();

    $scope.base_equipment = $scope.defaults.equipment;
    $scope.base_prestige = $scope.defaults.global.prestige;
    $scope.upgrade_names = $scope.defaults.upgrades;

    $scope._get_best_item = function(accum, name) {
        var datum = $scope.data.equipment[name]
        var cost_per_val = $scope.data.equipment[name].current_price / $scope.data.equipment[name].display_value;
        if(cost_per_val < accum[1])
            return [name, cost_per_val];
        else return accum;
    }
    $scope._item_price = function(item) {
        var resource = '';
        if(item.name === 'Shield') resource = 'wood';
        else resource = 'metal';

        return $scope.getItemPrice(item, resource);
    };
    $scope._get_display_value = function(item) {
        if(item.name === 'Shield') {
            if(item.blockNow) return item.blockCalculated;
            else return item.healthCalculated;
        } else if (_.indexOf($scope.weapons, item.name) > -1) {
            return item.attackCalculated;
        } else return item.healthCalculated;
    }

    $scope.import = function(save_data) {
        $scope.data = JSON.parse(LZString.decompressFromBase64(save_data));
        $scope.data.global.prestige = $scope.base_prestige;

        _.each(_.keys($scope.base_equipment), function(equip_name) {
            // set defaults; these are zeroed out in the save data
            var equip_data = $scope.data.equipment[equip_name];
            var base_data = $scope.base_equipment[equip_name];
            equip_data.cost = base_data.cost;
            // bring the prestiges up to par
            if(equip_data.prestige > 1) {
                for(var i=1,iLen=equip_data.prestige;i<iLen;i++) {
                    $scope.prestigeEquipment(equip_name, true, true);
                }
            }
            // simple displays
            equip_data.name = equip_name;
            equip_data.current_price = $scope._item_price(equip_data);
            equip_data.display_value = Math.max(0, $scope._get_display_value(equip_data));

            // calculate prestige values
            var prestige_value = $scope.getNextPrestigeValue(equip_data);
            var prestige_cost = $scope.getNextPrestigeCost(equip_data);
            equip_data.upgrade_efficiency = prestige_cost / prestige_value;
            equip_data.prestige_surpass = Math.ceil(equip_data.display_value * equip_data.level / prestige_value);
            equip_data.prestige_cost = prestige_cost * equip_data.prestige_surpass;
        });
        // calculate the best equipment in their classes
        var best_wep = _.reduce($scope.weapons, $scope._get_best_item, ['', Number.MAX_VALUE], this);
        $scope.data.equipment[best_wep[0]].is_best = true;
        var best_armor = _.reduce($scope.armor, $scope._get_best_item, ['', Number.MAX_VALUE], this);
        $scope.data.equipment[best_armor[0]].is_best = true;
        console.log($scope.data);
    };

    $scope.getItemPrice = function(toBuy, costItem) {
        if(!toBuy) return 0;
        var price = 0;
        var compare = "level";
        var thisCost = toBuy.cost[costItem];
            if (typeof thisCost[1] !== 'undefined'){
                if (thisCost.lastCheckCount != $scope.data.global.buyAmt || thisCost.lastCheckOwned != toBuy[compare]){
                    for (var x = 0; x < $scope.data.global.buyAmt; x++){
                            price += $scope.resolvePow(thisCost, toBuy, x);
                    }
                    thisCost.lastCheckCount = $scope.data.global.buyAmt;
                    thisCost.lastCheckAmount = price;
                    thisCost.lastCheckOwned = toBuy[compare];
                }
                else price = thisCost.lastCheckAmount;
            }
            else if (typeof thisCost === 'function') {
                price = thisCost();
            }
            else {
                price = thisCost * $scope.data.global.buyAmt;
            }
        return price;
    }

    $scope.resolvePow = function(cost, whatObj, addOwned) {
        if (!addOwned) addOwned = 0;
        var compare;
        if (typeof whatObj.done !== 'undefined') compare = 'done';
        if (typeof whatObj.level !== 'undefined') compare = 'level';
        if (typeof whatObj.owned !== 'undefined') compare = 'owned';
        if (typeof whatObj.purchased !== 'undefined') compare = 'purchased';
        return (Math.floor(cost[0] * Math.pow(cost[1], (whatObj[compare] + addOwned))));
    }

    $scope.prestigeEquipment = function(what, fromLoad, noInc) {
        var equipment = $scope.data.equipment[what];
        if (!fromLoad && !noInc) equipment.prestige++;
        var resource = (what == "Shield") ? "wood" : "metal";
        var cost = equipment.cost[resource];
        var prestigeMod = 0;
        if (equipment.prestige >= 4) prestigeMod = (((equipment.prestige - 3) * .85) + 2);
        else prestigeMod = (equipment.prestige - 1);
        cost[0] = Math.round(equipment.oc * Math.pow(1.069, ((prestigeMod) * $scope.data.global.prestige.cost) + 1));
        cost.lastCheckAmount = null;
        cost.lastCheckCount = null;
        cost.lastCheckOwned = null;
        var stat;
        if (equipment.blockNow) stat = "block";
        else stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
        if (!fromLoad) $scope.data.global[stat] -= (equipment[stat + "Calculated"] * equipment.level);
        equipment[stat + "Calculated"] = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige - 1) * $scope.data.global.prestige[stat]) + 1));
        //No need to touch level if it's newNum
        if (fromLoad) return;
        equipment.level = 0;
        if (document.getElementById(what + "Numeral") !== null) document.getElementById(what + "Numeral").innerHTML = romanNumeral(equipment.prestige);
    }

    $scope.getNextPrestigeCost = function(equipment){
        var prestigeMod;
        var nextPrestigeCount = equipment.prestige + 1;
        if (nextPrestigeCount >= 4) prestigeMod = (((nextPrestigeCount - 3) * .85) + 2);
        else prestigeMod = (nextPrestigeCount - 1);
        return Math.round(equipment.oc * Math.pow(1.069, ((prestigeMod) * $scope.data.global.prestige.cost) + 1));
    }

    $scope.getNextPrestigeValue = function(equipment){
        var stat;
        if (equipment.blockNow) stat = "block";
        else stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
        var toReturn = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige) * $scope.data.global.prestige[stat]) + 1));
        return toReturn;
    }

    // initialize tooltip values
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
    // initialize underscore/lodash templates
    // _.templateSettings.variable = "rc";
});



