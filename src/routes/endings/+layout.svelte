<script lang="ts">
    // Props

    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

{@render children()}

<style lang="scss">
</style>
