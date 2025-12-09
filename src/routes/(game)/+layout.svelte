<script lang="ts">
    // Components

    import Interface from "$lib/components/game/interface/Interface.svelte";

    // Props

    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<div class="container">
    {@render children()}
</div>

<Interface />

<style lang="scss">
</style>
