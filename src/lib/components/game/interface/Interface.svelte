<script lang="ts">
    // Components

    import Timer from "$lib/components/game/interface/Timer.svelte";
    import Resource from "$lib/components/game/interface/Resource.svelte";
</script>

<div class="interface">
    {#each ["wood", "rope", "rock"] as name}
        <Resource name={name as "wood" | "rope" | "rock"} />
    {/each}

    <Timer />
</div>

<style lang="scss">
    .interface {
        position: fixed;
        top: 0;
        left: 0;

        width: 100dvw;
        height: 100dvh;

        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(8, 1fr);
        justify-items: stretch;
        align-items: center;
        gap: 1dvh;
        padding: 1dvh;

        pointer-events: none;
    }
</style>
