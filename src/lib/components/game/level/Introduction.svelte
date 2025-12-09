<script lang="ts">
    // Components

    import Button from "$lib/components/common/Button.svelte";
    import Ornament from "$lib/components/common/Ornament.svelte";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";
    import { storage } from "$lib/Storage";

    const T: LocalizationEntry = localization.levelCommon;

    // Props

    import { onMount, type Snippet } from "svelte";

    let { level, children }: { level: number; children: Snippet } = $props();

    let dialog: HTMLDialogElement;

    function onclick() {
        dialog.close();
    }

    // onMount(() => setTimeout(() => dialog.showModal(), 100));
    // onMount(() => setInterval(() => $storage.time++, 100));
</script>

<dialog bind:this={dialog}>
    <h1>{T.introductionTitle} {level + 1}</h1>

    <p>{@render children()}</p>

    <div class="button">
        <Button {onclick}>{T.introductionButton}</Button>
    </div>

    <Ornament />
</dialog>

<style lang="scss">
    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;

        overflow: hidden;

        width: 55dvw;
        height: 70dvh;

        padding: 2rem;
        border: 2px solid var(--text);
        background: var(--bg-middle);
        color: var(--text);

        display: none;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        &[open] {
            display: flex;
        }

        h1 {
            font-size: 2.5rem;
            text-align: center;
            padding: 0 1rem;
        }

        p {
            font-size: 1.4rem;
            line-height: 1.6;
            text-align: center;
        }

        .button {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 40%;
            height: 7%;
        }

        &::backdrop {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
        }
    }
</style>
