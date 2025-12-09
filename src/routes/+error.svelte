<script lang="ts">
    // Assets

    import errorMasks from "$lib/images/interface/errorMasks.png";

    // Components

    import Button from "$lib/components/Button.svelte";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";

    const T: LocalizationEntry = localization.error;

    // Content

    import { onMount } from "svelte";

    let masks: HTMLDivElement;
    let masksWidth: number = $state(0);

    function onresize() {
        masksWidth = masks.clientWidth;
    }

    onMount(() => onresize());
</script>

<svelte:window {onresize} />

<div class="container">
    <div class="masks" bind:this={masks}>
        <img
            style:--width={masksWidth}
            src={errorMasks}
            alt="Old greek tragedy masks."
        />
    </div>

    <div class="title">
        {#each T.title.split(" ") as word}
            <span>{word}</span>
        {/each}
    </div>

    <div class="button">
        <Button onclick={() => (location.pathname = "/")}>
            {T.button} <span>➙</span>
        </Button>
    </div>
</div>

<style lang="scss">
    .container {
        width: 100dvw;
        height: 100dvh;

        background-size: cover;
        background-position: center;

        display: grid;
        grid-template-columns: 25fr repeat(4, calc(50fr / 4)) 25fr;
        grid-template-rows: 25fr repeat(4, calc(50fr / 4)) 25fr;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;

        .masks {
            grid-column: 2 / span 2;
            grid-row: 2 / span 2;

            justify-self: flex-start;

            height: 100%;
            aspect-ratio: 1 / 1;

            overflow: hidden;

            position: relative;

            &:hover {
                overflow: visible;

                img {
                    transform: scale(2);
                    animation: none;
                    z-index: 2;
                }
            }

            img {
                @keyframes masksVerticalAnimation {
                    0% {
                        top: calc((var(--width) * 3px) * (1 / 3) * -1);
                    }
                    100% {
                        top: calc((var(--width) * 3px) * (1 / 3) * 1);
                    }
                }

                @keyframes masksHorizontalAnimation {
                    0% {
                        left: calc((var(--width) * 3px) * (1 / 3) * -1);
                    }
                    100% {
                        left: calc((var(--width) * 3px) * (1 / 3) * 1);
                    }
                }

                width: 100%;
                aspect-ratio: 1 / 1;

                position: absolute;

                transform: scale(3);

                transition:
                    0.5s transform ease,
                    0.5s left ease,
                    0.5s top ease;

                animation:
                    masksVerticalAnimation linear 7s infinite alternate,
                    masksHorizontalAnimation linear 18s infinite alternate;
            }
        }

        .title {
            grid-column: 4 / span 2;
            grid-row: 2 / span 2;

            font-weight: bold;

            font-size: 7vmin;
            text-transform: uppercase;

            width: 100%;
            height: 100%;

            display: flex;
            justify-content: start;
            align-items: end;
            flex-direction: column;

            text-align: end;

            margin: 0;
            padding: 0;

            font-family: var(--font-caption);
        }

        .button {
            grid-column: 2 / span 2;
            grid-row: 4;
            justify-self: start;

            height: 50%;
            aspect-ratio: 4 / 1;

            transition: 0.25s transform ease;

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
        }
    }
</style>
