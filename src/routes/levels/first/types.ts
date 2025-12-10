    import type { StorageResourceType } from "$lib/Storage";
    
// Types

interface ResourceType {
    resource: StorageResourceType;
    index: number;
    image: string;
    padding: { x: number; y: number };
}

interface LocationType {
    image: string;
    resources: Array<ResourceType>;
}

export type { ResourceType, LocationType };
