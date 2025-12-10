<script lang="ts">
    // Assets

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Ornament from "../../components/Ornament.svelte";

    // Content

    import {
        storage,
        type StoragePartName,
        type StorageResourceType,
    } from "$lib/Storage";
    import { onMount, type Snippet } from "svelte";

    let {
        texts,
        pictures,
        good,
    }: {
        texts: Array<string>;
        pictures: Array<string>;
        good: boolean;
    } = $props();

    let shownPicture: number = $state(-0.5);

    function onclick() {
        location.pathname = "/";
    }

    onMount(() => {
        setTimeout(() => {
            shownPicture = (shownPicture + 0.5) % pictures.length;
        }, 1000);
        setTimeout(() => {
            shownPicture = (shownPicture + 0.5) % pictures.length;
        }, 7000);

        setInterval(() => {
            setTimeout(() => {
                shownPicture = (shownPicture + 0.5) % pictures.length;
            }, 1000);
            setTimeout(() => {
                shownPicture = (shownPicture + 0.5) % pictures.length;
            }, 7000);
        }, 10000);
        ``;
    });
</script>

<div class="container" class:good>
    {#each pictures as picture, index}
        <div
            class="picture"
            class:shown={index == shownPicture}
            style:background-image="url({picture})"
        >
            <Ornament />
        </div>
    {/each}

    {#each texts as text, index}
        <div class="text" style:--index={index}>
            {text}
        </div>
    {/each}

    <div class="next">
        <Button {onclick}>{T.back}</Button>
    </div>
</div>

<style lang="scss">
    .container {
        position: relative;

        width: 100dvw;
        height: 100dvh;

        background-color: #222222;
        color: #ffffff;

        &.good {
            background-color: var(--bg-back);
            color: var(--text);

            .text {
                color: var(--text);
            }

            :global(.container) {
                color: var(--text);
            }
        }

        :global(.container) {
            color: #ffffff;
        }

        .picture {
            @keyframes pictureAnimation {
                0% {
                    left: 0dvw;
                }
                100% {
                    left: calc(100dvw - (75dvh / 9 * 16));
                }
            }

            font-size: 2rem;

            position: absolute;

            top: 10%;
            opacity: 0;

            height: 75dvh;
            aspect-ratio: 16 / 9;

            background-size: cover;
            background-repeat: no-repeat;

            transition: 3s opacity ease;

            &.shown {
                opacity: 1;
            }

            animation: pictureAnimation 10s linear infinite;
        }

        .text {
            @keyframes popIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            position: absolute;

            font-size: 1.6em;

            width: 75dvw;

            top: calc(30dvh + 1.5em * var(--index));
            left: calc(20dvw + 1.5em * var(--index));

            color: white;

            opacity: 0;
            z-index: 2;

            animation: popIn 2s ease calc(3s * var(--index)) forwards;
        }

        .next {
            position: absolute;
            top: 90%;
            left: 40%;

            width: 20%;
        }
    }
</style>
