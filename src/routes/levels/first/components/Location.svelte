<script lang="ts">
    // Assets

    import { T } from "$lib/Localization";

    // Components

    import Resource from "./Resource.svelte";

    // Content

    import type { ResourceType, LocationType } from "../types";
    import { fly } from "svelte/transition";

    let {
        location,
        onclick,
    }: {
        location: LocationType;
        onclick: Function;
    } = $props();
</script>

<div
    class="container"
    in:fly={{ duration: 500, delay: 0, y: "50%", opacity: 0.1}}
    out:fly={{ duration: 500, delay: 0, y: "-50%", opacity: 0.1 }}
>
    <img src={location.image} alt={T.altLocation} />

    {#each location.resources as resource}
        <Resource {resource} onclick={(r: Resource) => onclick(location, r)} />
    {/each}
</div>

<style lang="scss">
    .container {
        position: relative;
        height: 100%;

        img {
            height: 100%;
        }
    }
</style>
