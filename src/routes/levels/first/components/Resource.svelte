<script lang="ts">
    // Content

    import type { ResourceType, LocationType } from "../types";
    import { storage } from "$lib/Storage";

    let {
        resource,
        onclick,
    }: {
        resource: ResourceType;
        onclick: Function;
    } = $props();

    let discovered = $derived(
        $storage.resources[resource.resource].discovered[resource.index]
    );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<img
    src={resource.image}
    onclick={() => onclick(resource)}
    style:top={`${discovered ? -10 : resource.padding.y}%`}
    style:left={`${discovered ? -100 : resource.padding.x}%`}
    style:opacity={`${discovered ? 0 : 1}`}
/>

<style lang="scss">
    img {
        position: absolute;

        cursor: pointer;

        top: 0px;
        left: 0px;
        opacity: 1;

        transition:
            1s top ease,
            1s left ease,
            0.75s opacity ease,
            0.25s transform ease,
            0.25s filter ease;

        filter: drop-shadow(1px 1px 2px #ffffff55)
            drop-shadow(-1px -1px 2px #ffffff55);

        &:hover {
            transform: scale(1.25);
            filter: drop-shadow(1px 1px 2px white)
                drop-shadow(-1px -1px 2px white);
        }
    }
</style>
