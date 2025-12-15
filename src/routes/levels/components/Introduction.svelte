<script lang="ts">
    // Assets

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Ornament from "../../components/Ornament.svelte";

    // Content

    import { storage } from "$lib/Storage";

    import { onMount, type Snippet } from "svelte";
    import { fly } from "svelte/transition";

    let { level, introduction }: { level: number; introduction: string } =
        $props();

    let dialog: HTMLDialogElement;
    let clicked: boolean = $state(false);
    let counter: number = $state(4);

    function onclick() {
        if (clicked) return;

        clicked = true;

        setTimeout(() => counter--, 100);
        setTimeout(() => counter--, 1000);
        setTimeout(() => counter--, 2000);
        setTimeout(() => {
            $storage.timeFrozen = false;
            dialog.close();
        }, 3000);
    }

    onMount(() => {
        $storage.timeFrozen = true;
        // dialog.showModal();
    });
</script>

<dialog bind:this={dialog}>
    {#if clicked}
        <div class="counter-container">
            {#key counter}
                <div
                    in:fly={{
                        duration: 1000,
                        delay: 0,
                        y: "2em",
                        opacity: 0.1,
                    }}
                    out:fly={{
                        duration: 1000,
                        delay: 0,
                        y: "-2em",
                        opacity: 0.1,
                    }}
                >
                    {counter}
                </div>
            {/key}
        </div>
    {:else}
        <h1>{T.introductionTitle} {level + 1}</h1>

        <div class="text">
            {#each introduction.split("<br>") as line}
                <div>{line}</div>
            {/each}
        </div>

        <div class="button">
            <Button {onclick}>{T.start}</Button>
        </div>
    {/if}

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
        border: 2px solid var(--border-color);
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

        .text {
            font-size: 1.4rem;
            line-height: 1.6;

            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: column;

            &:nth-child(odd) {
            align-items: flex-end;
                text-align: left;
            }
        }

        .button {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 40%;
            height: 7%;
        }

        .counter-container {
            width: 100%;
            height: 100%;

            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            div {
                position: absolute;

                text-align: center;
                font-size: 15rem;
            }
        }

        &::backdrop {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
        }
    }
</style>
