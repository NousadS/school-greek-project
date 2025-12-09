import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Storage {
    time: number;
    timeFrozen: boolean;

    //

    resources: {
        wood: {
            got: number;
            max: number;
            discovered: boolean[];
            increment: number[];
        };
        rope: {
            got: number;
            max: number;
            discovered: boolean[];
            increment: number[];
        };
        rock: {
            got: number;
            max: number;
            discovered: boolean[];
            increment: number[];
        };
    };

    //

    endings: boolean[];

    //

    levelOnePage: boolean;
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
            max: 50,
            discovered: [false, false],
            increment: [20, 30],
        },
        rock: {
            got: 0,
            max: 99,
            discovered: [false, false, false, false],
            increment: [21, 26, 26, 26],
        },
    },

    //

    endings: [false, false, false],

    //

    levelOnePage: false,
};

const STORAGE_KEY: string = "state";

const storage = ((): Writable<Storage> => {
    let initialValue: Storage = defaultStorageState;

    if (browser) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored)
                initialValue = { ...defaultStorageState, ...JSON.parse(stored) };
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

export { storage, defaultStorageState, type Storage };
