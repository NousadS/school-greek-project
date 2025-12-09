<script lang="ts">
    // Assets

    import endingImage1 from "$lib/images/ending-1/image-1.png";

    // Components

    import Button from "$lib/components/Button.svelte";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";
    import { storage } from "$lib/Storage";
    import { fly } from "svelte/transition";

    const T: LocalizationEntry = localization.ending[0];

    // Content

</script>

<div class="container">
</div>

<style lang="scss">
    .container {
        z-index: 0;

        width: 100dvw;
        height: 100dvh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        position: relative;

        .image {
            position: relative;
            height: 100%;

            .background {
                height: 100%;
            }

            .resource {
                position: absolute;

                cursor: pointer;

                top: 0px;
                left: 0px;
                opacity: 1;

                transition:
                    1s top ease,
                    1s left ease,
                    0.75s opacity ease,
                    0.25s transform ease,
                    0.25s filter ease;

                filter: drop-shadow(1px 1px 2px #ffffff55)
                    drop-shadow(-1px -1px 2px #ffffff55);

                &:hover {
                    transform: scale(1.25);
                    filter: drop-shadow(1px 1px 2px white)
                        drop-shadow(-1px -1px 2px white);
                }
            }
        }

        .next {
            position: absolute;
            top: 50%;
            right: 5%;

            height: 7%;
            aspect-ratio: 1 / 1;

            background-color: var(--bg-back);

            transition: 0.5s opacity ease;

            :global(.wrapper) {
                background-color: var(--bg-back);
            }

            :global(*) {
                font-weight: bold !important;
                font-size: 2rem;
            }
        }
    }
</style>
