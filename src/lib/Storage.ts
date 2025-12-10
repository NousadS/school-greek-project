import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

type StorageResourceType = "wood" | "rope" | "rock";

interface StorageResource {
    got: number;
    max: number;
    discovered: boolean[];
    increment: number[];
}

type StoragePartName =
    | "base"
    | "back"
    | "front"
    | "frontRopes"
    | "head"
    | "headRopes"
    | "leftBackWheelWood"
    | "leftBackWheel"
    | "leftFrontWheelWood"
    | "leftFrontWheel"
    | "rightBackWheelWood"
    | "rightBackWheel"
    | "rightFrontWheelWood"
    | "rightFrontWheel";

interface StoragePart {
    requires: StorageResourceType;
    cost: number;
    discovered: boolean;
}

interface Storage {
    time: number;
    timeFrozen: boolean;

    //

    resources: {
        wood: StorageResource;
        rope: StorageResource;
        rock: StorageResource;
    };

    levelOnePage: boolean;

    parts: {
        base: StoragePart;
        back: StoragePart;
        front: StoragePart;
        frontRopes: StoragePart;
        head: StoragePart;
        headRopes: StoragePart;
        leftBackWheelWood: StoragePart;
        leftBackWheel: StoragePart;
        leftFrontWheelWood: StoragePart;
        leftFrontWheel: StoragePart;
        rightBackWheelWood: StoragePart;
        rightBackWheel: StoragePart;
        rightFrontWheelWood: StoragePart;
        rightFrontWheel: StoragePart;
    };

    trust: number;

    //

    endings: boolean[];
}

const defaultStorageState: Storage = {
    time: 0,
    timeFrozen: false,

    //

    resources: {
        wood: {
            got: 0,
            max: 99,
            discovered: [false, false],
            increment: [54, 45],
        },
        rope: {
            got: 0,
            max: 49,
            discovered: [false, false],
            increment: [20, 29],
        },
        rock: {
            got: 0,
            max: 99,
            discovered: [false, false, false, false],
            increment: [21, 26, 26, 26],
        },
    },

    levelOnePage: false,

    parts: {
        base: {
            requires: "wood",
            cost: 29,
            discovered: false,
        },
        back: {
            requires: "wood",
            cost: 14,
            discovered: false,
        },
        front: {
            requires: "wood",
            cost: 29,
            discovered: false,
        },
        frontRopes: {
            requires: "rope",
            cost: 40,
            discovered: false,
        },
        head: {
            requires: "wood",
            cost: 19,
            discovered: false,
        },
        headRopes: {
            requires: "rope",
            cost: 9,
            discovered: false,
        },
        leftBackWheelWood: {
            requires: "wood",
            cost: 2,
            discovered: false,
        },
        leftBackWheel: {
            requires: "rock",
            cost: 25,
            discovered: false,
        },
        leftFrontWheelWood: {
            requires: "wood",
            cost: 2,
            discovered: false,
        },
        leftFrontWheel: {
            requires: "rock",
            cost: 25,
            discovered: false,
        },
        rightBackWheelWood: {
            requires: "wood",
            cost: 2,
            discovered: false,
        },
        rightBackWheel: {
            requires: "rock",
            cost: 25,
            discovered: false,
        },
        rightFrontWheelWood: {
            requires: "wood",
            cost: 2,
            discovered: false,
        },
        rightFrontWheel: {
            requires: "rock",
            cost: 24,
            discovered: false,
        },
    },

    trust: 4,

    //

    endings: [false, false, false, false],

    //
};

const STORAGE_KEY: string = "state";

const storage = ((): Writable<Storage> => {
    let initialValue: Storage = defaultStorageState;

    if (browser) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored)
                initialValue = {
                    ...defaultStorageState,
                    ...JSON.parse(stored),
                };
        } catch (e) {
            console.error("Error reading localStorage:", e);
        }
    }

    const store = writable<Storage>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
            } catch (e) {
                console.error("Error writing to localStorage:", e);
            }
        });
    }

    return store;
})();

export {
    storage,
    defaultStorageState,
    type Storage,
    type StoragePart,
    type StoragePartName,
    type StorageResource,
    type StorageResourceType,
};
