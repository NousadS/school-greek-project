<script lang="ts">
    // Assets

    import "../app.scss";

    // Components

    import Bypass from "./components/Bypass.svelte";

    // Props

    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
    <title>Nousad</title>
</svelte:head>

{@render children()}

<Bypass />

<style lang="scss">
</style>
