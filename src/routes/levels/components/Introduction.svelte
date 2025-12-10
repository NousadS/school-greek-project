<script lang="ts">
    // Assets

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Ornament from "../../components/Ornament.svelte";

    // Content

    import { storage } from "$lib/Storage";

    import { onDestroy, onMount, type Snippet } from "svelte";
    import { fly } from "svelte/transition";

    let { level, children }: { level: number; children: Snippet } = $props();

    let dialog: HTMLDialogElement;
    let clicked: boolean = $state(false);
    let counter: number = $state(3);

    function onclick() {
        clicked = true;

        setTimeout(() => counter--, 1000);
        setTimeout(() => counter--, 2000);
        setTimeout(() => {
            dialog.close();

            $storage.timeFrozen = false;
        }, 3000);
    }

    onMount(() => {
        $storage.timeFrozen = true;
        dialog.showModal();
    });
</script>

<dialog bind:this={dialog}>
    <h1>{T.introductionTitle} {level + 1}</h1>

    <div class="text" class:clicked>
        {#if clicked}
            <div class="counter-container">
                {#key counter}
                    <span
                        in:fly={{
                            duration: 100,
                            delay: 100,
                            y: "1em",
                            opacity: 0.5,
                        }}
                        out:fly={{
                            duration: 100,
                            delay: 0,
                            y: "-1em",
                            opacity: 0.5,
                        }}>{counter}</span
                    >
                {/key}
            </div>
        {:else}
            {@render children()}
        {/if}
    </div>

    <div class="button">
        <Button {onclick}>{T.start}</Button>
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
            text-align: center;

            &.clicked {
                font-weight: bold;
                font-size: 3rem;
            }

            .counter-container {
                width: 2em;
                height: 1em;
                line-height: 1em;

                text-align: center;

                position: relative;

                span {
                    position: absolute;
                }
            }
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
