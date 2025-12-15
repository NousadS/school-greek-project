<script lang="ts">
    // Assets

    import menuImage from "$lib/images/interface/menu/background.jpg";

    import { T } from "$lib/Localization";

    // Components

    import Button from "../components/Button.svelte";

    // Content

    import {
        storage,
        defaultStorageState,
        type StoragePartName,
        type StorageResourceType,
    } from "$lib/Storage";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    let clicked: boolean = $state(false);
    let shown: boolean = $state(false);

    function onclick() {
        clicked = true;

        $storage = defaultStorageState;

        setTimeout(() => (location.pathname = "/levels/first"), 750);
    }

    onMount(() =>
        setTimeout(() => {
            if (
                $storage.endingsLastTimeShown ===
                $storage.endings.filter((v) => v).length
            )
                return;

            shown = true;

            setTimeout(() => {
                $storage.endingsLastTimeShown = $storage.endings.filter(
                    (v) => v
                ).length;

                setTimeout(() => (shown = false), 1000);
            }, 1000);
        }, 1000)
    );
</script>

<div
    class="container"
    style="background-image:
    linear-gradient(
        315deg,
        rgba(255, 255, 255, 0.5),
        rgba(128, 128, 128, 0.5)
    ),
    url({menuImage})"
>
    <h1>
        {#each T.menuTitle.split(" ") as word, _}
            <span>
                <!-- {#each Array.from(word) as s, _}
                <span>{s}</span>
            {/each} -->
                {word}
            </span>
        {/each}
    </h1>

    <div class="description">{T.menuDescription}</div>
    <div class="authors">{T.menuAuthors}</div>

    {#if $storage.endings.reduce((p, c) => p || c)}
        <div class="endings" class:shown>
            <div>{T.menuEndings}</div>

            <div class="amount">
                <div class="counter-wrapper">
                    {#key $storage.endingsLastTimeShown}
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
                            class="counter"
                        >
                            {$storage.endingsLastTimeShown}
                        </div>
                    {/key}
                </div>
                <div>/</div>
                <div>{$storage.endings.length}</div>
            </div>
        </div>
    {/if}

    <div class="button" class:clicked>
        <Button {onclick}>{T.start} <span>➙</span></Button>
    </div>
</div>

<style lang="scss">
    .container {
        width: 100dvw;
        height: 100dvh;

        background: linear-gradient(
            315deg,
            rgba(255, 255, 255, 0.5),
            rgba(128, 128, 128, 0.5)
        );
        background-size: cover;
        background-position: center;

        display: grid;
        grid-template-columns: 25fr repeat(4, calc(50fr / 4)) 25fr;
        grid-template-rows: 25fr repeat(5, calc(50fr / 5)) 25fr;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;

        h1 {
            grid-column: 2 / span 4;
            grid-row: 2;

            font-size: 4rem;
            text-transform: uppercase;

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;

            margin: 0;
            padding: 0;

            font-family: var(--font-caption);
        }

        .description {
            grid-column: 2 / span 2;
            grid-row: 3;
            justify-self: start;

            text-align: left;
        }

        .authors {
            grid-column: 4 / span 2;
            grid-row: 3;
            justify-self: end;

            text-align: right;
        }

        .endings {
            grid-column: 2;
            grid-row: 4;

            width: 100%;
            height: 100%;

            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: row;

            transition: 1s transform ease;

            &.shown {
                transform: scale(3) translateX(50%) translateY(35%);
            }

            .amount {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: row;

                width: 3rem;

                div {
                    width: 1rem;
                }
            }

            .counter-wrapper {
                position: relative;

                .counter {
                    position: absolute;
                }
            }
        }

        .button {
            grid-column: 2 / span 4;
            grid-row: 5;
            justify-self: start;

            width: 12dvw;

            transition:
                0.5s width linear,
                0.25s color ease,
                0.25s transform ease;

            :global(button) {
                padding-left: 1rem;
                padding-right: 1rem;
            }

            :global(.container) {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            :global(span) {
                display: inline-block;

                font-size: 1.5em;
                line-height: 1rem;
                height: 1rem;
                // transform: translateY(0.2rem);
            }

            &.clicked {
                width: 100%;

                :global(button) {
                    transform: none;
                }
            }
        }
    }
</style>
