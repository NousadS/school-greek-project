import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Storage {
    time: number;
    timeFreeze: boolean;

    //

    wood: number;
    rope: number;
    rock: number;

    woodMax: number;
    ropeMax: number;
    rockMax: number;

    //

    discoveredEndings: number;
}

const defaultState: Storage = {
    time: 0,
    timeFreeze: false,
    wood: 0,
    rope: 0,
    rock: 0,
    woodMax: 15,
    ropeMax: 15,
    rockMax: 15,
    discoveredEndings: 0,
};

const STORAGE_KEY: string = "state";

const storage = ((): Writable<Storage> => {
    let initialValue: Storage = defaultState;

    if (browser) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored)
                initialValue = { ...defaultState, ...JSON.parse(stored) };
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

export { storage, type Storage };
