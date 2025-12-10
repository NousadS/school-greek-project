import type { StoragePartName } from "$lib/Storage";

interface PuzzlePart {
    name: StoragePartName;
    image: string;
    padding: { x: number; y: number };
}

export type { PuzzlePart };
