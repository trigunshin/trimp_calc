var defaults = {
    equipment: {
        Shield: {
            locked: 1,
            tooltip: "A big, wooden shield. Adds $healthCalculated$ health to each soldier per level.",
            blocktip: "A big, wooden shield. Adds $blockCalculated$ block to each soldier per level.",
            modifier: 1,
            level: 0,
            cost: {
                wood: [40, 1.2]
            },
            oc: 40,
            health: 4,
            healthCalculated: 4,
            blockNow: false,
            block: 1.5,
            blockCalculated: 1.5,
            prestige: 1
        },
        Dagger: {
            locked: 1,
            tooltip: "Better than nothing. Adds $attackCalculated$ attack to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [40, 1.2]
            },
            oc: 40,
            attack: 2,
            attackCalculated: 2,
            prestige: 1
        },
        Boots: {
            locked: 1,
            tooltip: "At least their feet will be safe. Adds $healthCalculated$ health to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [55, 1.2]
            },
            oc: 55,
            health: 6,
            healthCalculated: 6,
            prestige: 1
        },
        //2
        Mace: {
            locked: 1,
            tooltip: "It's kind of heavy for your Trimps, but they'll manage. Adds $attackCalculated$ attack to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [80, 1.2]
            },
            oc: 80,
            attack: 3,
            attackCalculated: 3,
            prestige: 1
        },
        Helmet: {
            locked: 1,
            tooltip: "Provides a decent amount of protection to the Trimps' heads, adding $healthCalculated$ health to each soldier per level.",
            modifier: 1,
            level: 0,
            cost: {
                metal: [100, 1.2]
            },
            oc: 100,
            health: 10,
            healthCalculated: 10,
            prestige: 1
        },
        //3
        Polearm: {
            locked: 1,
            tooltip: "This thing is big and pointy. It adds $attackCalculated$ attack to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [140, 1.2]
            },
            oc: 140,
            attack: 4,
            attackCalculated: 4,
            prestige: 1
        },
        Pants: {
            locked: 1,
            tooltip: "Pants designed specificially for the little Trimps! Adds $healthCalculated$ health to each soldier per level.",
            modifier: 1,
            level: 0,
            cost: {
                metal: [160, 1.2]
            },
            oc: 160,
            health: 14,
            healthCalculated: 14,
            prestige: 1
        },
        //4
        Battleaxe: {
            locked: 1,
            tooltip: "This weapon is pretty intimidating, but your Trimps think they can handle it. Adds $attackCalculated$ attack to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [230, 1.2]
            },
            oc: 230,
            attack: 7,
            attackCalculated: 7,
            prestige: 1
        },
        Shoulderguards: {
            locked: 1,
            tooltip: "These shoulderguards will help keep your Trimps' necks and shoulders safe, and they look cool too. Adds $healthCalculated$ health to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [275, 1.2]
            },
            oc: 275,
            health: 23,
            healthCalculated: 23,
            prestige: 1
        },
        //5
        Greatsword: {
            locked: 1,
            tooltip: "This sword looks sweet. Seriously, if you could see it you'd think it looked sweet. Trust me. Adds $attackCalculated$ attack to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [375, 1.2]
            },
            oc: 375,
            attack: 9,
            attackCalculated: 9,
            prestige: 1
        },
        Breastplate: {
            locked: 1,
            tooltip: "Some real, heavy duty armor. Everyone looks badass in heavy duty armor. Adds $healthCalculated$ health to each soldier per level",
            modifier: 1,
            level: 0,
            cost: {
                metal: [415, 1.2]
            },
            oc: 415,
            health: 35,
            healthCalculated: 35,
            prestige: 1
        }
    },
    prestige: {
        attack:13,
        cost:59,
        block:10,
        health:14
    },
    upgrades: {
        'Dagger': 'Dagadder',
        'Mace': 'Megamace',
        'Polearm': 'Polierarm',
        'Battleaxe': 'Axeidic',
        'Greatsword': 'Greatersword',
        'Shield': 'Supershield',
        'Boots': 'Bootboost',
        'Helmet': 'Hellishmet',
        'Pants': 'Pantastic',
        'Shoulderguards': 'Smoldershoulder',
        'Breastplate': 'Bestplate'
    }
};