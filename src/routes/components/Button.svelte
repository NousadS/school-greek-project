<script lang="ts">
    // Components

    import Ornament from "./Ornament.svelte";

    // Props

    import type { Snippet } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let {
        assubmit,
        onclick,
        children,
    }: {
        assubmit?: boolean;
        onclick?: MouseEventHandler<HTMLButtonElement>;
        children: Snippet;
    } = $props();
</script>

<div class="wrapper">
    {#if assubmit}
        <input type="submit" value="" />
    {:else}
        <button {onclick} title=""></button>
    {/if}

    <div class="container">
        {@render children()}
    </div>

    <Ornament />
</div>

<style lang="scss">
    .wrapper {
        width: calc(100% - 2rem);
        height: calc(100% - 1rem);

        position: relative;

        padding: 0.5rem 1rem;
        font-size: 1.2rem;

        cursor: pointer;
        border: 1px solid var(--border-color);
        background-color: transparent;

        z-index: 1;

        backdrop-filter: blur(1px);

        // box-shadow: 0px 0px 20px var(--text);
        color: var(--text);
        font-family: var(--font);
        font-weight: 400;

        transition:
            0.25s transform ease,
            0.25s box-shadow ease,
            0.25s color ease,
            0.25s font-weight ease;

        &:hover {
            box-shadow: 0px 0px 5px var(--text);

            font-weight: 1000;

            transform: scale(1.1);
        }

        button,
        input {
            cursor: pointer;
            background-color: transparent;
            color: transparent;
            border: none;

            width: 100%;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;

            z-index: 0;

            padding: 0;
            margin: 0;
        }

        .container {
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
        }
    }
</style>
