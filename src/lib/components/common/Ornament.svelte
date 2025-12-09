<script lang="ts">
    // Assets

    import ornament from "$lib/images/ornament.png";
</script>

{#each { length: 4 }}
    <img src={ornament} alt="Old greek border." />
{/each}

<style lang="scss">
    img {
        display: block;
        position: absolute;

        width: 1rem;
        aspect-ratio: 1 / 1;

        user-select: none;
        pointer-events: none;

        --p: -1px;

        &:nth-of-type(1) {
            top: var(--p);
            left: var(--p);
            transform: none;
        }

        &:nth-of-type(2) {
            top: var(--p);
            right: var(--p);
            transform: rotateZ(90deg);
        }

        &:nth-of-type(3) {
            bottom: var(--p);
            right: var(--p);
            transform: rotateZ(180deg);
        }

        &:nth-of-type(4) {
            bottom: var(--p);
            left: var(--p);
            transform: rotateZ(270deg);
        }
    }
</style>
